import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function onChange(e) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password) {
      setError("Email and password are required");
      return;
    }

    try {
      const data = await login({ email: form.email.trim(), password: form.password });
      setAuth(data.token, data.user);

      const from = location.state?.from;

      if (from) {
        navigate(from);
        return;
      }

      if (data.user.role === "receiver") navigate("/receiver");
      else if (data.user.role === "donor") navigate("/donor");
      else if (data.user.role === "admin") navigate("/admin");
      else navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="container auth-page">
      <div className="card">
        <h2>Sign In</h2>

        <form onSubmit={onSubmit}>
          <div className="field">
            <label>Email</label>
            <input className="input" name="email" value={form.email} onChange={onChange} />
          </div>

          <div className="field">
            <label>Password</label>
            <input className="input" type="password" name="password" value={form.password} onChange={onChange} />
          </div>

          {error ? <div className="error">{error}</div> : null}

          <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 10, flexWrap: "wrap" }}>
            <button className="btn btn-primary" type="submit">Sign In</button>
            <span className="small" style={{ color: "#fff" }}>
              Need an account? <Link to="/signup" style={{ color: "#fff" }}>Sign Up</Link>
            </span>
          </div>
        </form>

        <div className="card" style={{ marginTop: 14 }}>
          <h3 style={{ marginTop: 0 }}>Admin Login</h3>
          <p className="small" style={{ color: "#111" }}>
            Admin has no public signup. Seed the admin in MySQL (instructions in Database section).
          </p>
        </div>
      </div>
    </div>
  );
}
