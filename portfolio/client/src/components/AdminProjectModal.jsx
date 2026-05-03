import React, { useState, useEffect } from "react";
import { createProject, updateProject } from "../services/api/projects.api";
import toast from "react-hot-toast";

function AdminProjectModal({ project, onClose, onSaved }) {
  const isEdit = Boolean(project?.id);
  const [form, setForm] = useState({
    title: "",
    description: "",
    tech: "",
    githubUrl: "",
    liveUrl: "",
    featured: false,
    type: "FEATURED",
    order: 0,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (project) {
      setForm({
        title: project.title || "",
        description: project.description || "",
        tech: project.tech || "",
        githubUrl: project.githubUrl || "",
        liveUrl: project.liveUrl || "",
        featured: project.featured || false,
        type: project.type || "FEATURED",
        order: project.order || 0,
      });
      setImagePreview(project.imageUrl || null);
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => formData.append(key, val));
      if (imageFile) formData.append("image", imageFile);

      if (isEdit) {
        await updateProject(project.id, formData);
        toast.success("Project updated successfully!");
      } else {
        await createProject(formData);
        toast.success("Project created successfully!");
      }
      onSaved();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save project.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h3>{isEdit ? "Edit Project" : "Add New Project"}</h3>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="admin-modal-form">
          <div className="modal-form-grid">
            <div className="form-group col-span-2">
              <label>Title *</label>
              <input name="title" value={form.title} onChange={handleChange}
                placeholder="Project title" className="form-input" required />
            </div>

            <div className="form-group col-span-2">
              <label>Description *</label>
              <textarea name="description" value={form.description} onChange={handleChange}
                rows={3} placeholder="Project description..." className="form-input form-textarea" required />
            </div>

            <div className="form-group col-span-2">
              <label>Tech Stack *</label>
              <input name="tech" value={form.tech} onChange={handleChange}
                placeholder="React, Node.js, MongoDB..." className="form-input" required />
            </div>

            <div className="form-group">
              <label>GitHub URL</label>
              <input name="githubUrl" value={form.githubUrl} onChange={handleChange}
                placeholder="https://github.com/..." className="form-input" type="url" />
            </div>

            <div className="form-group">
              <label>Live URL</label>
              <input name="liveUrl" value={form.liveUrl} onChange={handleChange}
                placeholder="https://..." className="form-input" type="url" />
            </div>

            <div className="form-group">
              <label>Type</label>
              <select name="type" value={form.type} onChange={handleChange} className="form-input">
                <option value="FEATURED">Featured</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Order</label>
              <input name="order" value={form.order} onChange={handleChange}
                type="number" min="0" className="form-input" />
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" name="featured" checked={form.featured}
                  onChange={handleChange} className="checkbox-input" />
                <span>Featured Project</span>
              </label>
            </div>

            <div className="form-group col-span-2">
              <label>Project Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="image-preview" />
              )}
            </div>
          </div>

          <div className="admin-modal-footer">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? "Saving..." : isEdit ? "Update Project" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminProjectModal;
