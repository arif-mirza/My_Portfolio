import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { createExperience, updateExperience } from "../services/api/experience.api";

function AdminExperienceModal({ experience, onClose, onSaved }) {
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState(experience?.imageUrl || null);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    label: "",
    title: "",
    companyName: "",
    companyUrl: "",
    duration: "",
    description: "",
    order: 0,
  });

  useEffect(() => {
    if (experience) {
      setForm({
        label: experience.label,
        title: experience.title,
        companyName: experience.companyName,
        companyUrl: experience.companyUrl || "",
        duration: experience.duration,
        description: experience.description,
        order: experience.order,
      });
      setImagePreview(experience.imageUrl);
    }
  }, [experience]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(experience?.imageUrl || null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));
    
    if (fileInputRef.current?.files[0]) {
      formData.append("image", fileInputRef.current.files[0]);
    }

    try {
      if (experience) {
        await updateExperience(experience.id, formData);
        toast.success("Experience updated!");
      } else {
        await createExperience(formData);
        toast.success("Experience added!");
      }
      onSaved();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save experience");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{experience ? "Edit Experience" : "Add Experience"}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <form id="exp-form" onSubmit={handleSubmit}>
            
            <div className="form-group">
              <label>Sidebar Label (e.g., Software Developer Intern)</label>
              <input name="label" className="form-input" value={form.label} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Job Title</label>
              <input name="title" className="form-input" value={form.title} onChange={handleChange} required />
            </div>

            <div className="form-row" style={{display: 'flex', gap: '1rem'}}>
              <div className="form-group" style={{flex: 1}}>
                <label>Company Name</label>
                <input name="companyName" className="form-input" value={form.companyName} onChange={handleChange} required />
              </div>
              <div className="form-group" style={{flex: 1}}>
                <label>Company URL (optional)</label>
                <input name="companyUrl" className="form-input" type="url" value={form.companyUrl} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row" style={{display: 'flex', gap: '1rem'}}>
              <div className="form-group" style={{flex: 1}}>
                <label>Duration (e.g., Jan 2023 - Present)</label>
                <input name="duration" className="form-input" value={form.duration} onChange={handleChange} required />
              </div>
              <div className="form-group" style={{flex: 1}}>
                <label>Order (for sorting)</label>
                <input name="order" type="number" className="form-input" value={form.order} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label>Description (HTML supported for bullets/links)</label>
              <textarea name="description" className="form-input form-textarea" rows="5" value={form.description} onChange={handleChange} required 
                placeholder="<li>Point 1</li><li>Point 2</li>"/>
            </div>

            <div className="form-group">
              <label>Experience Image (optional, appears at the bottom)</label>
              {imagePreview && (
                <div style={{ marginBottom: "1rem" }}>
                  <img src={imagePreview} alt="Preview" style={{ width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "8px" }} />
                </div>
              )}
              <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageChange} className="form-input" style={{ padding: "8px" }} />
            </div>

          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose} disabled={saving}>Cancel</button>
          <button type="submit" form="exp-form" className="btn-primary" disabled={saving}>
            {saving ? "Saving..." : "Save Experience"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminExperienceModal;
