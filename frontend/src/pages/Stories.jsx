import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getApprovedTestimonials, submitTestimonial } from "../services/publicService";
import { deleteTestimonial as adminDeleteTestimonial } from "../services/adminService";

export default function Stories() {
  const { user } = useAuth();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [form, setForm] = useState({
    message: "",
    rating: "5"
  });

  useEffect(() => {
    loadTestimonials();
  }, []);

  async function loadTestimonials() {
    setLoading(true);
    try {
      const data = await getApprovedTestimonials();
      setTestimonials(data.testimonials || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function onChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.message || form.message.length < 10) {
      setError("Please write at least 10 characters");
      return;
    }

    try {
      await submitTestimonial({
        message: form.message.trim(),
        rating: Number(form.rating)
      });
      setSuccess("Thank you! Your testimonial has been submitted for review.");
      setForm({ message: "", rating: "5" });
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to submit testimonial");
    }
  }

  const renderStars = (rating) => {
    return "⭐".repeat(rating || 0);
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Success Stories & Testimonials</h2>
        <p className="small">
          Real stories from our community members whose lives have been touched by blood donation. 
          These testimonials inspire us to continue our mission of connecting donors with those in need.
        </p>
      </div>

      {user && (user.role === "donor" || user.role === "receiver") && (
        <div className="card">
          <h3>Share Your Experience</h3>
          <p className="small">
            Your story can inspire others to donate blood and save lives. Share your experience with us!
          </p>
          
          <form onSubmit={onSubmit}>
            <div className="field">
              <label>Your Testimonial *</label>
              <textarea 
                className="input" 
                name="message" 
                value={form.message} 
                onChange={onChange} 
                rows="5"
                placeholder="Tell us about your experience with our blood donation system..."
              />
            </div>

            <div className="field">
              <label>Rating</label>
              <select className="input" name="rating" value={form.rating} onChange={onChange}>
                <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
                <option value="3">⭐⭐⭐ (3 Stars)</option>
                <option value="2">⭐⭐ (2 Stars)</option>
                <option value="1">⭐ (1 Star)</option>
              </select>
            </div>

            {error ? <div className="error">{error}</div> : null}
            {success ? <div className="success">{success}</div> : null}

            <button className="btn btn-primary" type="submit">Submit Testimonial</button>
          </form>
        </div>
      )}

      {!user && (
        <div className="card">
          <p className="small">
            <a href="/signin" style={{ color: "#c41e3a" }}>Sign in</a> to share your experience and leave a testimonial.
          </p>
        </div>
      )}

      <div className="card">
        <h3>Testimonials from Our Community</h3>
      </div>

      {loading ? (
        <div className="card">
          <p className="small">Loading testimonials...</p>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="card">
          <p className="small">No testimonials yet. Be the first to share your experience!</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "20px" }}>
          {testimonials.map((t) => (
            <div className="card" key={t.id} style={{
              borderLeft: "4px solid #c41e3a",
              backgroundColor: "#fafafa"
            }}>
              <div style={{ marginBottom: "15px" }}>
                <div style={{ fontSize: "20px", marginBottom: "5px" }}>
                  {renderStars(t.rating)}
                </div>
                <p style={{ 
                  fontStyle: "italic", 
                  color: "#333", 
                  lineHeight: "1.6",
                  margin: "10px 0"
                }}>
                  "{t.message}"
                </p>
              </div>
              
              <div style={{ 
                borderTop: "1px solid #e0e0e0", 
                paddingTop: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div>
                  <p style={{ margin: 0, fontWeight: "bold", color: "#c41e3a" }}>
                    {t.user_name}
                  </p>
                  <p className="small" style={{ margin: "3px 0 0 0", color: "#666" }}>
                    {t.user_role === "donor" ? "Donor" : "Receiver"}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <p className="small" style={{ margin: 0, color: "#999" }}>
                    {new Date(t.created_at).toLocaleDateString()}
                  </p>
                  {user?.role === 'admin' && (
                    <button
                      className="btn btn-danger"
                      onClick={async () => {
                        if (window.confirm('Delete this testimonial?')) {
                          try {
                            await adminDeleteTestimonial(t.id);
                            setTestimonials((prev) => prev.filter((x) => x.id !== t.id));
                          } catch (e) {
                            alert(e?.response?.data?.message || 'Failed to delete');
                          }
                        }
                      }}
                      style={{ fontSize: '12px', padding: '6px 10px' }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
