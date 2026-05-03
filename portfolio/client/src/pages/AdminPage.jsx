import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useProjects } from "../hooks/useProjects";
import { useWorks } from "../hooks/useWorks";
import { useMessages } from "../hooks/useMessages";
import { useExperience } from "../hooks/useExperience";
import AdminProjectModal from "../components/AdminProjectModal";
import AdminExperienceModal from "../components/AdminExperienceModal";
import { deleteWork, createWork, updateWork } from "../services/api/works.api";
import { deleteExperience } from "../services/api/experience.api";
import toast from "react-hot-toast";
import "../styles/AdminPage.css";

// ── Login Form ────────────────────────────────────────────────
function LoginForm() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(form);
      toast.success("Welcome back, Admin! 👋");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-login-icon">🔐</div>
          <h1>Admin Portal</h1>
          <p>Portfolio Management System</p>
        </div>
        <form onSubmit={handleSubmit} className="admin-login-form">
          {error && <div className="admin-error-alert">{error}</div>}
          <div className="form-group">
            <label htmlFor="admin-email">Email</label>
            <input id="admin-email" type="email" placeholder="admin@example.com"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="form-input" required />
          </div>
          <div className="form-group">
            <label htmlFor="admin-password">Password</label>
            <input id="admin-password" type="password" placeholder="••••••••"
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="form-input" required />
          </div>
          <button type="submit" className="btn-primary admin-login-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Projects Tab ──────────────────────────────────────────────
function ProjectsTab() {
  const { projects, loading, error, refetch, remove } = useProjects();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await remove(id);
      toast.success("Project deleted.");
    } catch {
      toast.error("Failed to delete project.");
    }
  };

  const openCreate = () => { setSelectedProject(null); setModalOpen(true); };
  const openEdit = (p) => { setSelectedProject(p); setModalOpen(true); };

  if (loading) return <div className="admin-loader">Loading projects...</div>;
  if (error) return <div className="admin-error">{error}</div>;

  return (
    <div className="admin-tab-content">
      <div className="admin-tab-header">
        <h2>Projects <span className="count-badge">{projects.length}</span></h2>
        <button className="btn-primary" onClick={openCreate} id="add-project-btn">
          + Add Project
        </button>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Tech</th>
              <th>Featured</th>
              <th>Links</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td className="td-title">
                  {p.imageUrl && <img src={p.imageUrl} alt={p.title} className="table-thumb" />}
                  <span>{p.title}</span>
                </td>
                <td><span className={`type-badge type-${p.type.toLowerCase()}`}>{p.type}</span></td>
                <td className="td-tech">{p.tech.substring(0, 40)}...</td>
                <td>{p.featured ? "✅" : "—"}</td>
                <td className="td-links">
                  {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" className="table-link">GitHub</a>}
                  {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="table-link">Live</a>}
                </td>
                <td className="td-actions">
                  <button className="btn-edit" onClick={() => openEdit(p)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(p.id, p.title)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <AdminProjectModal
          project={selectedProject}
          onClose={() => setModalOpen(false)}
          onSaved={refetch}
        />
      )}
    </div>
  );
}

// ── Works Tab ─────────────────────────────────────────────────
function WorksTab() {
  const { works, loading, error, refetch } = useWorks();
  const [form, setForm] = useState({ title: "", info: "", tech: "", githubUrl: "", liveUrl: "", order: 0 });
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleDelete = async (id) => {
    if (!confirm("Delete this work?")) return;
    try {
      await deleteWork(id);
      toast.success("Work deleted.");
      refetch();
    } catch { toast.error("Failed to delete."); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) { await updateWork(editId, form); toast.success("Work updated!"); }
      else { await createWork(form); toast.success("Work created!"); }
      refetch();
      setForm({ title: "", info: "", tech: "", githubUrl: "", liveUrl: "", order: 0 });
      setEditId(null);
    } catch { toast.error("Failed to save."); }
    finally { setSaving(false); }
  };

  const startEdit = (w) => {
    setEditId(w.id);
    setForm({ title: w.title, info: w.info, tech: w.tech, githubUrl: w.githubUrl || "", liveUrl: w.liveUrl || "", order: w.order });
  };

  if (loading) return <div className="admin-loader">Loading works...</div>;

  return (
    <div className="admin-tab-content">
      <div className="admin-tab-header">
        <h2>Works / Project Cards <span className="count-badge">{works.length}</span></h2>
      </div>
      <div className="works-admin-grid">
        {/* Form */}
        <div className="works-form-panel">
          <h3>{editId ? "Edit Work" : "Add New Work"}</h3>
          <form onSubmit={handleSubmit}>
            {["title", "info", "tech", "githubUrl", "liveUrl"].map((field) => (
              <div className="form-group" key={field}>
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                {field === "info" ? (
                  <textarea value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className="form-input form-textarea" rows={3} />
                ) : (
                  <input value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className="form-input" />
                )}
              </div>
            ))}
            <div className="form-group">
              <label>Order</label>
              <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })}
                className="form-input" />
            </div>
            <div className="form-row">
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? "Saving..." : editId ? "Update" : "Create"}
              </button>
              {editId && <button type="button" className="btn-secondary" onClick={() => { setEditId(null); setForm({ title: "", info: "", tech: "", githubUrl: "", liveUrl: "", order: 0 }); }}>Cancel</button>}
            </div>
          </form>
        </div>
        {/* List */}
        <div className="works-list-panel">
          {works.map((w) => (
            <div key={w.id} className="works-admin-card">
              <div>
                <strong>{w.title}</strong>
                <p className="works-tech">{w.tech.substring(0, 60)}...</p>
              </div>
              <div className="td-actions">
                <button className="btn-edit" onClick={() => startEdit(w)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(w.id)}>Del</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Experience Tab ──────────────────────────────────────────────
function ExperienceTab() {
  const { experiences, loading, error, refetch } = useExperience();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await deleteExperience(id);
      toast.success("Experience deleted.");
      refetch();
    } catch {
      toast.error("Failed to delete experience.");
    }
  };

  const openCreate = () => { setSelectedExperience(null); setModalOpen(true); };
  const openEdit = (e) => { setSelectedExperience(e); setModalOpen(true); };

  if (loading) return <div className="admin-loader">Loading experiences...</div>;
  if (error) return <div className="admin-error">{error}</div>;

  return (
    <div className="admin-tab-content">
      <div className="admin-tab-header">
        <h2>Experience <span className="count-badge">{experiences?.length || 0}</span></h2>
        <button className="btn-primary" onClick={openCreate}>
          + Add Experience
        </button>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Label</th>
              <th>Company</th>
              <th>Duration</th>
              <th>Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiences?.map((e) => (
              <tr key={e.id}>
                <td className="td-title">
                  {e.imageUrl && <img src={e.imageUrl} alt={e.companyName} className="table-thumb" />}
                  <span>{e.label}</span>
                </td>
                <td>{e.companyName}</td>
                <td>{e.duration}</td>
                <td>{e.order}</td>
                <td className="td-actions">
                  <button className="btn-edit" onClick={() => openEdit(e)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(e.id, e.companyName)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <AdminExperienceModal
          experience={selectedExperience}
          onClose={() => setModalOpen(false)}
          onSaved={refetch}
        />
      )}
    </div>
  );
}

// ── Messages Tab ──────────────────────────────────────────────
function MessagesTab() {
  const { messages, unreadCount, loading, error, markRead, remove } = useMessages();
  const [selected, setSelected] = useState(null);

  if (loading) return <div className="admin-loader">Loading messages...</div>;
  if (error) return <div className="admin-error">{error}</div>;

  return (
    <div className="admin-tab-content">
      <div className="admin-tab-header">
        <h2>
          Inbox <span className="count-badge">{messages.length}</span>
          {unreadCount > 0 && <span className="unread-badge">{unreadCount} unread</span>}
        </h2>
      </div>

      {messages.length === 0 ? (
        <div className="admin-empty">No messages yet. 📭</div>
      ) : (
        <div className="messages-layout">
          {/* Message list */}
          <div className="messages-list">
            {messages.map((m) => (
              <div key={m.id} className={`message-item ${!m.isRead ? "unread" : ""} ${selected?.id === m.id ? "active" : ""}`}
                onClick={() => { setSelected(m); if (!m.isRead) markRead(m.id); }}>
                <div className="message-meta">
                  <strong>{m.name}</strong>
                  {!m.isRead && <span className="dot-unread" />}
                </div>
                <div className="message-email">{m.email}</div>
                <div className="message-preview">{m.subject || m.body.substring(0, 40)}...</div>
                <div className="message-date">{new Date(m.createdAt).toLocaleDateString()}</div>
              </div>
            ))}
          </div>

          {/* Message detail */}
          <div className="message-detail">
            {selected ? (
              <>
                <div className="detail-header">
                  <div>
                    <h3>{selected.subject || "No Subject"}</h3>
                    <p>From: <strong>{selected.name}</strong> &lt;{selected.email}&gt;</p>
                    <p className="detail-date">{new Date(selected.createdAt).toLocaleString()}</p>
                  </div>
                  <button className="btn-delete" onClick={async () => { await remove(selected.id); setSelected(null); toast.success("Deleted."); }}>
                    Delete
                  </button>
                </div>
                <div className="detail-body">{selected.body}</div>
                <a href={`mailto:${selected.email}?subject=Re: ${selected.subject || "Your message"}`}
                  className="btn-primary reply-btn">Reply via Email</a>
              </>
            ) : (
              <div className="detail-placeholder">Select a message to read it</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Admin Page ───────────────────────────────────────────
const TABS = ["Projects", "Works", "Experience", "Messages"];

function AdminPage() {
  const { isAdmin, user, logout, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("Projects");

  if (loading) {
    return (
      <div className="admin-loading-screen">
        <div className="loading-spinner" />
        <p>Verifying admin session...</p>
      </div>
    );
  }

  if (!isAdmin) return <LoginForm />;

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="brand-icon">⚡</span>
          <span>Portfolio Admin</span>
        </div>
        <nav className="admin-nav">
          {TABS.map((tab) => (
            <button key={tab} className={`admin-nav-item ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)} id={`admin-tab-${tab.toLowerCase()}`}>
              {tab === "Projects" && "🗂️"}
              {tab === "Works" && "💼"}
              {tab === "Messages" && "✉️"}
              <span>{tab}</span>
            </button>
          ))}
        </nav>
        <div className="admin-user-info">
          <div className="user-avatar">{user?.name?.charAt(0)}</div>
          <div>
            <div className="user-name">{user?.name}</div>
            <div className="user-role">{user?.role}</div>
          </div>
          <button className="logout-btn" onClick={logout} title="Logout">⏻</button>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        <div className="admin-topbar">
          <h1 className="admin-page-title">{activeTab}</h1>
          <div className="admin-topbar-right">
            <a href="/" target="_blank" className="view-site-btn">View Portfolio →</a>
          </div>
        </div>

        {activeTab === "Projects" && <ProjectsTab />}
        {activeTab === "Works" && <WorksTab />}
        {activeTab === "Experience" && <ExperienceTab />}
        {activeTab === "Messages" && <MessagesTab />}
      </main>
    </div>
  );
}

export default AdminPage;
