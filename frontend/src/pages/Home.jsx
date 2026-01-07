import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">
      <div className="card">
        <h2>Blood Donation Management System</h2>
        <p className="small">
          A semester Web Engineering project demonstrating authentication, role-based access,
          and full-stack CRUD using React, Node.js, and MySQL.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link className="btn btn-primary" to="/order-blood">Order Blood</Link>
          <Link className="btn" to="/donors">View Donors</Link>
          <Link className="btn" to="/signup">Create Account</Link>
        </div>
      </div>

      <div className="grid">
        <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80, background: 'rgba(220, 53, 69, 0.1)', borderRadius: '0 0 0 50px' }}></div>
          <h3 style={{ marginTop: 0 }}>🩸 For Receivers</h3>
          <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>Need blood urgently? Create blood requests, track approval status in real-time, and coordinate with our donor network.</p>
          <ul style={{ margin: '12px 0', paddingLeft: 20 }}>
            <li className="small" style={{ marginBottom: 6 }}>Create urgent blood requests</li>
            <li className="small" style={{ marginBottom: 6 }}>Track request status live</li>
            <li className="small">Get matched with available donors</li>
          </ul>
          <Link className="btn btn-primary" to="/signup" style={{ marginTop: 16, width: '100%', textAlign: 'center' }}>Request Blood Now</Link>
        </div>
        <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80, background: 'rgba(220, 53, 69, 0.1)', borderRadius: '0 0 0 50px' }}></div>
          <h3 style={{ marginTop: 0 }}>❤️ For Donors</h3>
          <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>Save lives by donating blood. Manage your profile, schedule appointments, and track your donation history.</p>
          <ul style={{ margin: '12px 0', paddingLeft: 20 }}>
            <li className="small" style={{ marginBottom: 6 }}>Schedule donation appointments</li>
            <li className="small" style={{ marginBottom: 6 }}>Manage your health profile</li>
            <li className="small">Track your donation impact</li>
          </ul>
          <Link className="btn btn-primary" to="/signup" style={{ marginTop: 16, width: '100%', textAlign: 'center' }}>Become a Donor</Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20, marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
        <div style={{ textAlign: 'center', padding: '20px', background: '#fff', borderRadius: 12, border: '1px solid #e8e8e8' }}>
          <p style={{ fontSize: 28, fontWeight: 700, color: '#dc3545', margin: '0 0 8px 0' }}>10+</p>
          <p className="small" style={{ margin: 0, color: '#666' }}>Lives Saved</p>
        </div>
        <div style={{ textAlign: 'center', padding: '20px', background: '#fff', borderRadius: 12, border: '1px solid #e8e8e8' }}>
          <p style={{ fontSize: 28, fontWeight: 700, color: '#dc3545', margin: '0 0 8px 0' }}>50+</p>
          <p className="small" style={{ margin: 0, color: '#666' }}>Active Donors</p>
        </div>
        <div style={{ textAlign: 'center', padding: '20px', background: '#fff', borderRadius: 12, border: '1px solid #e8e8e8' }}>
          <p style={{ fontSize: 28, fontWeight: 700, color: '#dc3545', margin: '0 0 8px 0' }}>10+</p>
          <p className="small" style={{ margin: 0, color: '#666' }}>Blood Banks</p>
        </div>
        <div style={{ textAlign: 'center', padding: '20px', background: '#fff', borderRadius: 12, border: '1px solid #e8e8e8' }}>
          <p style={{ fontSize: 28, fontWeight: 700, color: '#dc3545', margin: '0 0 8px 0' }}>24/7</p>
          <p className="small" style={{ margin: 0, color: '#666' }}>Available</p>
        </div>
      </div>

      <div className="card">
        <h3>How It Works</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 20, marginTop: 20 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 50, height: 50, background: '#ffebee', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 24 }}>📝</div>
            <p style={{ margin: '0 0 8px 0', fontWeight: 600, color: '#111' }}>Sign Up</p>
            <p className="small" style={{ margin: 0 }}>Create account as receiver or donor</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 50, height: 50, background: '#ffebee', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 24 }}>🔍</div>
            <p style={{ margin: '0 0 8px 0', fontWeight: 600, color: '#111' }}>Search</p>
            <p className="small" style={{ margin: 0 }}>Find available blood or donors</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 50, height: 50, background: '#ffebee', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 24 }}>✓</div>
            <p style={{ margin: '0 0 8px 0', fontWeight: 600, color: '#111' }}>Connect</p>
            <p className="small" style={{ margin: 0 }}>Admin approves & coordinates</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 50, height: 50, background: '#ffebee', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 24 }}>🎉</div>
            <p style={{ margin: '0 0 8px 0', fontWeight: 600, color: '#111' }}>Complete</p>
            <p className="small" style={{ margin: 0 }}>Save lives & make impact</p>
          </div>
        </div>
      </div>
    </div>
  );
}
