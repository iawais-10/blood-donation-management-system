import React, { useEffect, useState } from "react";
import StatusBadge from "../../components/StatusBadge";
import {
  approveRequest,
  getAllRequests,
  getAppointments,
  getDonors,
  getStats,
  markDelivered,
  rejectRequest,
  approveAppointment,
  rejectAppointment,
  deleteRequest,
  deleteAppointment,
  getAllTestimonials,
  approveTestimonial,
  rejectTestimonial
} from "../../services/adminService";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [donors, setDonors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [counts, setCounts] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function load() {
    setError("");
    setSuccess("");
    try {
      const [r, d, a, s, t] = await Promise.all([
        getAllRequests(),
        getDonors(),
        getAppointments(),
        getStats(),
        getAllTestimonials()
      ]);

      setRequests(r.requests || []);
      setDonors(d.donors || []);
      setAppointments(a.appointments || []);
      setTestimonials(t.testimonials || []);
      setCounts(s.counts || null);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load admin data");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function action(fn, id) {
    setError("");
    setSuccess("");
    try {
      await fn(id);
      setSuccess("Action completed");
      await load();
    } catch (err) {
      setError(err?.response?.data?.message || "Action failed");
    }
  }

  function removeTestimonialFromUI(id) {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    setSuccess("Removed from dashboard view");
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Admin Dashboard</h2>
        <p className="small">Manage blood requests, donors, and appointments with full control.</p>
      </div>

      {error ? <div style={{ marginLeft: 20, marginRight: 20 }}><div className="error">{error}</div></div> : null}
      {success ? <div style={{ marginLeft: 20, marginRight: 20 }}><div className="success">{success}</div></div> : null}

      <div className="card">
        <h3>System Statistics</h3>
        {!counts ? (
          <p className="small">Loading statistics...</p>
        ) : (
          <div className="dashboard-stats">
            <div className="stat-card">
              <h4>Total Requests</h4>
              <p className="stat-value">{counts.totalRequests}</p>
            </div>
            <div className="stat-card">
              <h4>Pending Requests</h4>
              <p className="stat-value">{counts.pending}</p>
            </div>
            <div className="stat-card">
              <h4>Approved Requests</h4>
              <p className="stat-value">{counts.approved}</p>
            </div>
            <div className="stat-card">
              <h4>Delivered</h4>
              <p className="stat-value">{counts.delivered}</p>
            </div>
            <div className="stat-card">
              <h4>Active Donors</h4>
              <p className="stat-value">{counts.totalDonors}</p>
            </div>
            <div className="stat-card">
              <h4>Appointments</h4>
              <p className="stat-value">{counts.totalAppointments}</p>
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <h3>Blood Requests Management</h3>
        {requests.length === 0 ? (
          <p className="small">No blood requests found.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Receiver</th>
                  <th>Blood</th>
                  <th>Qty</th>
                  <th>Urgency</th>
                  <th>Hospital</th>
                  <th>City</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span><strong>{r.receiver_name}</strong></span>
                        <span className="small">{r.receiver_email}</span>
                      </div>
                    </td>
                    <td><strong>{r.blood_group}</strong></td>
                    <td>{r.quantity}</td>
                    <td>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontWeight: 500,
                        fontSize: '12px',
                        backgroundColor: r.urgency === 'High' ? '#ffebee' : r.urgency === 'Medium' ? '#fff3e0' : '#e8f5e9',
                        color: r.urgency === 'High' ? '#c62828' : r.urgency === 'Medium' ? '#e65100' : '#2e7d32'
                      }}>
                        {r.urgency}
                      </span>
                    </td>
                    <td>{r.hospital}</td>
                    <td>{r.city}</td>
                    <td><StatusBadge status={r.status} /></td>
                    <td>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <button className="btn" onClick={() => action(approveRequest, r.id)} disabled={r.status !== "pending"} style={{ fontSize: '12px', padding: '6px 10px' }}>
                          Approve
                        </button>
                        <button className="btn" onClick={() => action(rejectRequest, r.id)} disabled={r.status !== "pending"} style={{ fontSize: '12px', padding: '6px 10px' }}>
                          Reject
                        </button>
                        <button className="btn btn-primary" onClick={() => action(markDelivered, r.id)} disabled={r.status !== "approved"} style={{ fontSize: '12px', padding: '6px 10px' }}>
                          Delivered
                        </button>
                        <button 
                          className="btn btn-danger" 
                          onClick={() => {
                            if (window.confirm('Delete this request permanently?')) {
                              action(deleteRequest, r.id);
                            }
                          }}
                          style={{ fontSize: '12px', padding: '6px 10px' }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="grid">
        <div className="card">
          <h3>Registered Donors</h3>
          {donors.length === 0 ? (
            <p className="small">No registered donors yet.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Blood</th>
                    <th>Phone</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {donors.map((d) => (
                    <tr key={d.id}>
                      <td><strong>{d.name}</strong></td>
                      <td><span style={{ background: '#ffebee', padding: '2px 8px', borderRadius: '4px', color: '#c62828', fontWeight: 'bold' }}>{d.blood_group || "-"}</span></td>
                      <td>{d.phone || "-"}</td>
                      <td className="small">{d.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="card">
          <h3>Appointment Requests</h3>
          {appointments.length === 0 ? (
            <p className="small">No appointment requests pending.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Donor</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((a) => (
                    <tr key={a.id}>
                      <td>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <span><strong>{a.donor_name}</strong></span>
                          <span className="small">{a.donor_email}</span>
                        </div>
                      </td>
                      <td>{a.appointment_date}</td>
                      <td>{a.appointment_time}</td>
                      <td><StatusBadge status={a.status} /></td>
                      <td>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          <button className="btn" onClick={() => action(approveAppointment, a.id)} disabled={a.status !== "pending"} style={{ fontSize: '12px', padding: '6px 10px' }}>
                            Approve
                          </button>
                          <button className="btn" onClick={() => action(rejectAppointment, a.id)} disabled={a.status !== "pending"} style={{ fontSize: '12px', padding: '6px 10px' }}>
                            Reject
                          </button>
                          <button 
                            className="btn btn-danger" 
                            onClick={() => {
                              if (window.confirm('Delete this appointment?')) {
                                action(deleteAppointment, a.id);
                              }
                            }}
                            style={{ fontSize: '12px', padding: '6px 10px' }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <h3>Testimonials Moderation</h3>
        {testimonials.length === 0 ? (
          <p className="small">No testimonials submitted yet.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Rating</th>
                  <th>Message</th>
                  <th>Approved</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span><strong>{t.user_name}</strong></span>
                        <span className="small">{new Date(t.created_at).toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="small">{t.user_role}</td>
                    <td>{t.rating ? '⭐'.repeat(t.rating) : '-'}</td>
                    <td className="small" style={{ maxWidth: 420 }}>{t.message}</td>
                    <td>{t.is_approved ? <span className="badge badge-approved">Approved</span> : <span className="badge badge-pending">Pending</span>}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <button className="btn" disabled={t.is_approved} onClick={() => action(approveTestimonial, t.id)} style={{ fontSize: '12px', padding: '6px 10px' }}>Approve</button>
                        <button className="btn" disabled={!t.is_approved} onClick={() => action(rejectTestimonial, t.id)} style={{ fontSize: '12px', padding: '6px 10px' }}>Unapprove</button>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            if (window.confirm('Remove this testimonial from dashboard view?')) {
                              removeTestimonialFromUI(t.id);
                            }
                          }}
                          style={{ fontSize: '12px', padding: '6px 10px' }}
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
        <button className="btn btn-primary" onClick={load} style={{ fontWeight: 600 }}>↻ Refresh Data</button>
      </div>
    </div>
  );
}
