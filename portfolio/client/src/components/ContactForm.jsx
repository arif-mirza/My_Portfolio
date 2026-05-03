import React, { useState, useEffect } from "react";
import { sendMessage } from "../services/api/messages.api";
import toast from "react-hot-toast";
import Button from "./Button";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", body: "" });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Artificial delay to show the professional loader animation
    const timer = setTimeout(() => setIsInitialLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.length < 2) e.name = "Name must be at least 2 characters.";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Please enter a valid email.";
    if (!form.body.trim() || form.body.length < 10) e.body = "Message must be at least 10 characters.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      await sendMessage(form);
      toast.success("Message sent! I'll get back to you soon");
      setForm({ name: "", email: "", subject: "", body: "" });
      setErrors({});
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to send message. Please try again.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (isInitialLoading) {
    return (
      <SkeletonTheme baseColor="#1e1e24" highlightColor="#2a2a35">
        <div className="contact-api-form" style={{ padding: '0', background: 'transparent' }}>
          <div className="contact-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            <div className="form-group">
              <Skeleton height={20} width={60} style={{ marginBottom: "8px", borderRadius: "4px" }} />
              <Skeleton height={50} style={{ borderRadius: "8px" }} />
            </div>
            <div className="form-group">
              <Skeleton height={20} width={60} style={{ marginBottom: "8px", borderRadius: "4px" }} />
              <Skeleton height={50} style={{ borderRadius: "8px" }} />
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <Skeleton height={20} width={140} style={{ marginBottom: "8px", borderRadius: "4px" }} />
            <Skeleton height={50} style={{ borderRadius: "8px" }} />
          </div>
          <div className="form-group" style={{ marginBottom: '24px' }}>
            <Skeleton height={20} width={80} style={{ marginBottom: "8px", borderRadius: "4px" }} />
            <Skeleton height={140} style={{ borderRadius: "8px" }} />
          </div>
          <Skeleton height={55} width={180} style={{ borderRadius: "30px" }} />
        </div>
      </SkeletonTheme>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-api-form" noValidate>
      <div className="contact-form-grid">
        {/* Name */}
        <div className="form-group">
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className={`form-input ${errors.name ? "input-error" : ""}`}
            disabled={submitting}
          />
          {errors.name && <span className="error-msg">{errors.name}</span>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={`form-input ${errors.email ? "input-error" : ""}`}
            disabled={submitting}
          />
          {errors.email && <span className="error-msg">{errors.email}</span>}
        </div>
      </div>

      {/* Subject */}
      <div className="form-group">
        <label htmlFor="contact-subject">Subject (optional)</label>
        <input
          id="contact-subject"
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Job opportunity / Freelance project..."
          className="form-input"
          disabled={submitting}
        />
      </div>

      {/* Message */}
      <div className="form-group">
        <label htmlFor="contact-body">Message</label>
        <textarea
          id="contact-body"
          name="body"
          value={form.body}
          onChange={handleChange}
          placeholder="Hello, I would like to..."
          rows={5}
          className={`form-input form-textarea ${errors.body ? "input-error" : ""}`}
          disabled={submitting}
        />
        {errors.body && <span className="error-msg">{errors.body}</span>}
      </div>

      <Button
        type="submit"
        text=
        {submitting ? (
          <span className="btn-spinner">
            <span className="spinner-dot" />
            Sending...
          </span>
        ) : (
          "Send Message"
        )}
        className="fw-bold px-5"
        disabled={submitting}
        id="contact-submit-btn"

      >

      </Button>
    </form>
  );
}

export default ContactForm;
