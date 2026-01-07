import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import StatusBadge from "../../components/StatusBadge";
import { createAppointment, getDonorProfile, getMyAppointments, deleteAppointment } from "../../services/donorService";

export default function DonorDashboard() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const [form, setForm] = useState({
    appointment_date: "",
    appointment_time: "",
    notes: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function load() {
    setError("");
    try {
      const p = await getDonorProfile();
      setProfile(p.user);

      const a = await getMyAppointments();
      setAppointments(a.appointments || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load donor data");
    }
  }

  useEffect(() => {
    load();
  }, []);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function validate() {
    if (!form.appointment_date) return "Date is required";
    if (!form.appointment_time) return "Time is required";
    return "";
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    try {
      await createAppointment({
        appointment_date: form.appointment_date,
        appointment_time: form.appointment_time,
        notes: form.notes.trim() || null
      });
      setSuccess("Appointment request submitted");
      setForm({ appointment_date: "", appointment_time: "", notes: "" });
      await load();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to schedule appointment");
    }
  }

  async function onDelete(appointmentId) {
    if (!window.confirm("Are you sure you want to delete this appointment request?")) return;
    
    setError("");
    setSuccess("");
    try {
      await deleteAppointment(appointmentId);
      setSuccess("Appointment deleted successfully");
      await load();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete appointment");
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Donor Dashboard</h2>
        <p className="small">
          Welcome, <b>{user?.name}</b>. Schedule your blood donation appointments and track their status.
        </p>
      </div>

      {error ? <div style={{ marginLeft: 20, marginRight: 20 }}><div className="error">{error}</div></div> : null}
      {success ? <div style={{ marginLeft: 20, marginRight: 20 }}><div className="success">{success}</div></div> : null}

      <div className="grid">
        <div className="card">
          <h3>Your Profile</h3>
          {!profile ? (
            <p className="small">Loading profile information...</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ borderBottom: '1px solid #e8e8e8', paddingBottom: '12px' }}>
                <p className="small" style={{ margin: '0 0 4px 0', color: '#666' }}><strong>Name</strong></p>
                <p style={{ margin: 0, fontSize: '15px' }}>{profile.name}</p>
              </div>
              <div style={{ borderBottom: '1px solid #e8e8e8', paddingBottom: '12px' }}>
                <p className="small" style={{ margin: '0 0 4px 0', color: '#666' }}><strong>Blood Group</strong></p>
                <p style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#dc3545' }}>
                  {profile.blood_group ? <span style={{ background: '#ffebee', padding: '4px 8px', borderRadius: '4px' }}>{profile.blood_group}</span> : "-"}
                </p>
              </div>
              <div style={{ borderBottom: '1px solid #e8e8e8', paddingBottom: '12px' }}>
                <p className="small" style={{ margin: '0 0 4px 0', color: '#666' }}><strong>Phone</strong></p>
                <p style={{ margin: 0, fontSize: '15px' }}>{profile.phone || "Not provided"}</p>
              </div>
              <div>
                <p className="small" style={{ margin: '0 0 4px 0', color: '#666' }}><strong>Email</strong></p>
                <p style={{ margin: 0, fontSize: '15px' }}>{profile.email}</p>
              </div>
            </div>
          )}
        </div>

        <div className="card">
          <h3>Schedule Appointment</h3>

          <form onSubmit={onSubmit}>
            <div className="field">
              <label>Preferred Date</label>
              <input className="input" type="date" name="appointment_date" value={form.appointment_date} onChange={onChange} />
            </div>

            <div className="field">
              <label>Preferred Time</label>
              <input className="input" type="time" name="appointment_time" value={form.appointment_time} onChange={onChange} />
            </div>

            <div className="field">
              <label>Notes (optional)</label>
              <textarea className="input" name="notes" value={form.notes} onChange={onChange} rows="3" placeholder="Any special requirements or health concerns..." />
            </div>

            {error ? <div className="error">{error}</div> : null}
            {success ? <div className="success">{success}</div> : null}

            <button className="btn btn-primary" type="submit" style={{ width: '100%', fontWeight: 600, padding: '12px' }}>Submit Appointment Request</button>
          </form>
        </div>
      </div>

      <div className="card">
        <h3>Your Appointment Requests</h3>
        {appointments.length === 0 ? (
          <p className="small">No appointment requests yet. Schedule one to get started!</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Notes</th>
                  <th>Status</th>
                  <th>Submitted</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr key={a.id}>
                    <td><strong>{a.appointment_date}</strong></td>
                    <td>{a.appointment_time}</td>
                    <td className="small" style={{ maxWidth: '150px' }}>{a.notes || "-"}</td>
                    <td><StatusBadge status={a.status} /></td>
                    <td className="small">{new Date(a.created_at).toLocaleDateString()}</td>
                    <td>
                      <button 
                        className="btn btn-danger" 
                        style={{ fontSize: "12px", padding: "6px 10px" }}
                        onClick={() => onDelete(a.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
