import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function SignUp() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "receiver",
    blood_group: "O+",
    phone: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function onChange(e) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function validate() {
    if (form.name.trim().length < 2) return "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return "Valid email is required";
    if (form.password.length < 6) return "Password must be at least 6 characters";
    if (!["receiver", "donor"].includes(form.role)) return "Role must be receiver or donor";
    if (form.role === "donor" && !BLOOD_GROUPS.includes(form.blood_group)) return "Valid blood group is required for donors";
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
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
        blood_group: form.role === "donor" ? form.blood_group : null,
        phone: form.phone.trim() || null
      };

      const data = await signup(payload);
      setAuth(data.token, data.user);
      setSuccess("Account created successfully");

      if (data.user.role === "receiver") navigate("/receiver");
      else navigate("/donor");
    } catch (err) {
      setError(err?.response?.data?.message || "Signup failed");
    }
  }

  return (
    <div className="container auth-page">
      <div className="card">
        <h2>Sign Up</h2>
        <p className="small">Admin accounts are created manually in the database.</p>

        <form onSubmit={onSubmit}>
          <div className="grid">
            <div>
              <div className="field">
                <label>Name</label>
                <input className="input" name="name" value={form.name} onChange={onChange} />
              </div>

              <div className="field">
                <label>Email</label>
                <input className="input" name="email" value={form.email} onChange={onChange} />
              </div>

              <div className="field">
                <label>Password</label>
                <input className="input" type="password" name="password" value={form.password} onChange={onChange} />
              </div>
            </div>

            <div>
              <div className="field">
                <label>Role</label>
                <select name="role" value={form.role} onChange={onChange}>
                  <option value="receiver">Receiver</option>
                  <option value="donor">Donor</option>
                </select>
              </div>

              {form.role === "donor" && (
                <div className="field">
                  <label>Blood Group</label>
                  <select name="blood_group" value={form.blood_group} onChange={onChange}>
                    {BLOOD_GROUPS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="field">
                <label>Phone (optional)</label>
                <input className="input" name="phone" value={form.phone} onChange={onChange} />
              </div>
            </div>
          </div>

          {error ? <div className="error">{error}</div> : null}
          {success ? <div className="success">{success}</div> : null}

          <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 10, flexWrap: "wrap" }}>
            <button className="btn btn-primary" type="submit">Create Account</button>
            <span className="small">
              Already have an account? <Link to="/signin">Sign In</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
