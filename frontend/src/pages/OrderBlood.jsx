import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function OrderBlood() {
  const { user } = useAuth();
  const navigate = useNavigate();

  function proceed() {
    if (!user) {
      navigate("/signin", { replace: false, state: { from: "/order-blood" } });
      return;
    }
    if (user.role === "receiver") navigate("/receiver");
    else navigate("/");
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Order Blood</h2>
        <p style={{ lineHeight: "1.8", fontSize: "16px" }}>
          Need blood urgently? Our platform makes it easy to submit blood requests that are reviewed 
          and processed by our admin team to ensure you get the help you need as quickly as possible.
        </p>
      </div>

      <div className="card">
        <h3>How to Request Blood</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginTop: "20px" }}>
          <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
            <div style={{ fontSize: "32px", marginBottom: "10px" }}>1️⃣</div>
            <h4 style={{ margin: "10px 0", color: "#c41e3a" }}>Register/Sign In</h4>
            <p className="small">Create a receiver account or sign in to your existing account</p>
          </div>

          <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
            <div style={{ fontSize: "32px", marginBottom: "10px" }}>2️⃣</div>
            <h4 style={{ margin: "10px 0", color: "#c41e3a" }}>Submit Request</h4>
            <p className="small">Fill in blood group, quantity, hospital details, and urgency level</p>
          </div>

          <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
            <div style={{ fontSize: "32px", marginBottom: "10px" }}>3️⃣</div>
            <h4 style={{ margin: "10px 0", color: "#c41e3a" }}>Admin Review</h4>
            <p className="small">Our team reviews and approves legitimate requests quickly</p>
          </div>

          <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
            <div style={{ fontSize: "32px", marginBottom: "10px" }}>4️⃣</div>
            <h4 style={{ margin: "10px 0", color: "#c41e3a" }}>Receive Blood</h4>
            <p className="small">Coordination with donors and delivery to your hospital</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Information You'll Need</h3>
        <ul style={{ lineHeight: "2", fontSize: "15px" }}>
          <li><b>Blood Group:</b> Specify the required blood type (A+, A-, B+, B-, AB+, AB-, O+, O-)</li>
          <li><b>Quantity:</b> Number of units needed</li>
          <li><b>Urgency Level:</b> Emergency, Urgent, or Routine</li>
          <li><b>Hospital Details:</b> Hospital name and location</li>
          <li><b>City:</b> City where blood is needed</li>
          <li><b>Contact Information:</b> Your verified phone number and email</li>
        </ul>
      </div>

      <div className="card">
        <h3>Blood Group Compatibility</h3>
        <p className="small" style={{ marginBottom: "15px" }}>
          Understanding blood group compatibility helps in urgent situations:
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Blood Group</th>
              <th>Can Receive From</th>
              <th>Can Donate To</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>O-</b></td>
              <td>O-</td>
              <td>All blood groups (Universal Donor)</td>
            </tr>
            <tr>
              <td><b>O+</b></td>
              <td>O+, O-</td>
              <td>O+, A+, B+, AB+</td>
            </tr>
            <tr>
              <td><b>A-</b></td>
              <td>A-, O-</td>
              <td>A-, A+, AB-, AB+</td>
            </tr>
            <tr>
              <td><b>A+</b></td>
              <td>A+, A-, O+, O-</td>
              <td>A+, AB+</td>
            </tr>
            <tr>
              <td><b>B-</b></td>
              <td>B-, O-</td>
              <td>B-, B+, AB-, AB+</td>
            </tr>
            <tr>
              <td><b>B+</b></td>
              <td>B+, B-, O+, O-</td>
              <td>B+, AB+</td>
            </tr>
            <tr>
              <td><b>AB-</b></td>
              <td>AB-, A-, B-, O-</td>
              <td>AB-, AB+</td>
            </tr>
            <tr>
              <td><b>AB+</b></td>
              <td>All blood groups (Universal Receiver)</td>
              <td>AB+</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card" style={{ backgroundColor: "#fff5f5", borderLeft: "4px solid #c41e3a" }}>
        <h3 style={{ color: "#c41e3a" }}>Ready to Submit Your Request?</h3>
        
        {!user ? (
          <>
            <p style={{ lineHeight: "1.8", marginBottom: "15px" }}>
              Blood requests can only be created by registered Receiver accounts. Please sign in 
              or create a new account to continue.
            </p>
            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              <Link to="/signin" className="btn btn-primary">Sign In</Link>
              <Link to="/signup" className="btn">Create Account</Link>
            </div>
          </>
        ) : user.role !== "receiver" ? (
          <>
            <p style={{ lineHeight: "1.8", marginBottom: "15px" }}>
              You are currently logged in as <b>{user.role}</b>. Only Receiver accounts can create blood requests. 
              {user.role === "donor" && " As a donor, you can schedule appointments from your dashboard."}
            </p>
            <button className="btn" onClick={() => navigate("/")}>Go to Home</button>
          </>
        ) : (
          <>
            <p style={{ lineHeight: "1.8", marginBottom: "15px" }}>
              You're logged in as a Receiver. Click below to go to your dashboard and submit a blood request.
            </p>
            <button className="btn btn-primary" onClick={proceed}>
              Go to Dashboard & Submit Request
            </button>
          </>
        )}
      </div>


    </div>
  );
}
