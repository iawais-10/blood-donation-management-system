import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function onChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.email || !form.message) {
      setError("Please fill all required fields");
      return;
    }

    // Simulate form submission (you can integrate email service later)
    setSuccess("Thank you for contacting us! We'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Contact Us</h2>
        <p className="small">
          Have questions or need assistance? We're here to help! Fill out the form below or reach out to us through our contact information.
        </p>
      </div>

      <div className="grid">
        <div className="card">
          <h3>Send us a Message</h3>
          <form onSubmit={onSubmit}>
            <div className="field">
              <label>Name *</label>
              <input 
                className="input" 
                type="text" 
                name="name" 
                value={form.name} 
                onChange={onChange} 
                placeholder="Your full name"
              />
            </div>

            <div className="field">
              <label>Email *</label>
              <input 
                className="input" 
                type="email" 
                name="email" 
                value={form.email} 
                onChange={onChange} 
                placeholder="your.email@example.com"
              />
            </div>

            <div className="field">
              <label>Subject</label>
              <input 
                className="input" 
                type="text" 
                name="subject" 
                value={form.subject} 
                onChange={onChange} 
                placeholder="What is this regarding?"
              />
            </div>

            <div className="field">
              <label>Message *</label>
              <textarea 
                className="input" 
                name="message" 
                value={form.message} 
                onChange={onChange} 
                rows="6"
                placeholder="Tell us how we can help you..."
              />
            </div>

            {error ? <div className="error">{error}</div> : null}
            {success ? <div className="success">{success}</div> : null}

            <button className="btn btn-primary" type="submit">Send Message</button>
          </form>
        </div>

        <div className="card">
          <h3>Contact Information</h3>
          
          <div style={{ marginBottom: "20px" }}>
            <h4 style={{ marginTop: 0, marginBottom: "10px" }}>📍 Address</h4>
            <p className="small" style={{ color: "#666" }}>
              Blood Donation Management System<br />
              Main Boulevard, Gulshan-e-Iqbal<br />
              Karachi, Pakistan
            </p>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h4 style={{ marginTop: 0, marginBottom: "10px" }}>📞 Phone</h4>
            <p className="small" style={{ color: "#666" }}>
              Helpline: +92-300-1234567<br />
              Office: +92-21-34567890
            </p>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h4 style={{ marginTop: 0, marginBottom: "10px" }}>📧 Email</h4>
            <p className="small" style={{ color: "#666" }}>
              General: support@bdms.com<br />
              Emergencies: emergency@bdms.com
            </p>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h4 style={{ marginTop: 0, marginBottom: "10px" }}>🕐 Working Hours</h4>
            <p className="small" style={{ color: "#666" }}>
              Monday - Friday: 9:00 AM - 6:00 PM<br />
              Saturday: 10:00 AM - 4:00 PM<br />
              Sunday: Closed<br />
              <span style={{ color: "#c41e3a", fontWeight: "bold" }}>24/7 Emergency Support Available</span>
            </p>
          </div>

  
        </div>
      </div>
    </div>
  );
}
