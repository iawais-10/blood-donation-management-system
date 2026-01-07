import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { createBloodRequest, getMyRequests, deleteBloodRequest } from "../../services/receiverService";
import StatusBadge from "../../components/StatusBadge";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function ReceiverDashboard() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    blood_group: "O+",
    quantity: 1,
    urgency: "High",
    hospital: "",
    city: ""
  });

  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function load() {
    setError("");
    try {
      const data = await getMyRequests();
      setRequests(data.requests || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load requests");
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
    if (!BLOOD_GROUPS.includes(form.blood_group)) return "Select a valid blood group";
    const qty = Number(form.quantity);
    if (!Number.isInteger(qty) || qty <= 0) return "Quantity must be a positive integer";
    if (String(form.urgency).trim().length < 2) return "Urgency is required";
    if (form.hospital.trim().length < 2) return "Hospital is required";
    if (form.city.trim().length < 2) return "City is required";
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
      await createBloodRequest({
        blood_group: form.blood_group,
        quantity: Number(form.quantity),
        urgency: form.urgency.trim(),
        hospital: form.hospital.trim(),
        city: form.city.trim()
      });
      setSuccess("Request created");
      setForm((p) => ({ ...p, hospital: "", city: "" }));
      await load();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create request");
    }
  }

  async function onDelete(requestId) {
    if (!window.confirm("Are you sure you want to delete this request?")) return;
    
    setError("");
    setSuccess("");
    try {
      await deleteBloodRequest(requestId);
      setSuccess("Request deleted successfully");
      await load();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete request");
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Receiver Dashboard</h2>
        <p className="small">
          Welcome, <b>{user?.name}</b>. Create and manage your blood requests. Track status in real-time.
        </p>
      </div>

      {error ? <div style={{ marginLeft: 20, marginRight: 20 }}><div className="error">{error}</div></div> : null}
      {success ? <div style={{ marginLeft: 20, marginRight: 20 }}><div className="success">{success}</div></div> : null}

      <div className="grid">
        <div className="card">
          <h3>New Blood Request</h3>

          <form onSubmit={onSubmit}>
            <div className="field">
              <label>Blood Group Required</label>
              <select name="blood_group" value={form.blood_group} onChange={onChange} className="input">
                {BLOOD_GROUPS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>Quantity (units)</label>
              <input className="input" name="quantity" type="number" min="1" value={form.quantity} onChange={onChange} />
            </div>

            <div className="field">
              <label>Urgency Level</label>
              <select name="urgency" value={form.urgency} onChange={onChange} className="input">
                <option value="High">High - Urgent</option>
                <option value="Medium">Medium - Standard</option>
                <option value="Low">Low - Planned</option>
              </select>
            </div>

            <div className="field">
              <label>Hospital/Clinic Name</label>
              <input className="input" name="hospital" value={form.hospital} onChange={onChange} placeholder="e.g., City Medical Hospital" />
            </div>

            <div className="field">
              <label>City</label>
              <input className="input" name="city" value={form.city} onChange={onChange} placeholder="e.g., New York" />
            </div>

            <button className="btn btn-primary" type="submit" style={{ width: '100%', fontWeight: 600, padding: '12px' }}>Create Request</button>
          </form>
        </div>

        <div className="card">
          <h3>Request Summary</h3>
          {requests.length === 0 ? (
            <p className="small">No blood requests yet. Create one to get started.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #dc3545' }}>
                <p className="small" style={{ margin: '0 0 8px 0', color: '#666' }}>Total Requests</p>
                <p style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: '#dc3545' }}>{requests.length}</p>
              </div>
              <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #ffc107' }}>
                <p className="small" style={{ margin: '0 0 8px 0', color: '#666' }}>Pending</p>
                <p style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: '#ffc107' }}>{requests.filter(r => r.status === 'pending').length}</p>
              </div>
              <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #28a745' }}>
                <p className="small" style={{ margin: '0 0 8px 0', color: '#666' }}>Approved</p>
                <p style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: '#28a745' }}>{requests.filter(r => r.status === 'approved').length}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <h3>Your Blood Requests</h3>
        {requests.length === 0 ? (
          <p className="small">No blood requests yet. Create one above to request blood.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Blood</th>
                  <th>Qty</th>
                  <th>Urgency</th>
                  <th>Hospital</th>
                  <th>City</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr key={r.id}>
                    <td><strong style={{ color: '#dc3545', fontSize: '15px' }}>{r.blood_group}</strong></td>
                    <td>{r.quantity} units</td>
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
                      <button 
                        className="btn btn-danger" 
                        style={{ fontSize: "12px", padding: "6px 10px" }}
                        onClick={() => onDelete(r.id)}
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
