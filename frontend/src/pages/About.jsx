import React from "react";

export default function About() {
  return (
    <div className="container">
      <div className="card">
        <h2>About Us</h2>
        <p style={{ lineHeight: "1.8", fontSize: "16px" }}>
          Welcome to the <b>Blood Donation Management System (BDMS)</b> - a comprehensive platform 
          dedicated to saving lives by connecting blood donors with those in need. Our mission is to 
          streamline the blood donation process and make it more accessible, efficient, and transparent.
        </p>
      </div>

      <div className="card">
        <h3>Our Mission</h3>
        <p style={{ lineHeight: "1.8" }}>
          To create a bridge between generous blood donors and patients in urgent need, ensuring that 
          no life is lost due to blood shortage. We strive to build a community where donating blood 
          is easy, organized, and celebrated.
        </p>
      </div>

      <div className="card">
        <h3>Our Vision</h3>
        <p style={{ lineHeight: "1.8" }}>
          To become the leading blood donation management platform, making blood donation a seamless 
          process and ensuring adequate blood supply is available for every patient who needs it. 
          We envision a future where no one has to worry about blood availability during emergencies.
        </p>
      </div>

      <div className="card">
        <h3>How It Works</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginTop: "20px" }}>
          <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px", borderLeft: "4px solid #c41e3a" }}>
            <h4 style={{ marginTop: 0, color: "#c41e3a" }}>1. For Donors</h4>
            <p className="small">
              Register as a donor, schedule appointments at your convenience, and receive approval 
              from our admin team. Track your donation history and make a difference in someone's life.
            </p>
          </div>

          <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px", borderLeft: "4px solid #c41e3a" }}>
            <h4 style={{ marginTop: 0, color: "#c41e3a" }}>2. For Receivers</h4>
            <p className="small">
              Create urgent blood requests specifying blood group, quantity, and hospital details. 
              Our admin team reviews and approves requests to ensure legitimacy and coordinate delivery.
            </p>
          </div>

          <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px", borderLeft: "4px solid #c41e3a" }}>
            <h4 style={{ marginTop: 0, color: "#c41e3a" }}>3. Admin Management</h4>
            <p className="small">
              Our dedicated admin team manages all requests and appointments, verifies information, 
              coordinates between donors and receivers, and ensures smooth operations.
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Key Features</h3>
        <ul style={{ lineHeight: "2", fontSize: "15px" }}>
          <li><b>Easy Registration:</b> Simple sign-up process for donors and receivers</li>
          <li><b>Appointment Scheduling:</b> Donors can request appointments at their convenience</li>
          <li><b>Blood Request Management:</b> Receivers can submit urgent blood requirements</li>
          <li><b>Admin Oversight:</b> Verified approvals ensure safety and authenticity</li>
          <li><b>Real-time Tracking:</b> Monitor your requests and appointments status</li>
          <li><b>Donor Directory:</b> Browse available donors by blood group</li>
          <li><b>Success Stories:</b> Share and read inspiring testimonials</li>
          <li><b>24/7 Availability:</b> Submit requests anytime, anywhere</li>
        </ul>
      </div>

      <div className="card">
        <h3>Why Donate Blood?</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginTop: "20px" }}>
          <div style={{ textAlign: "center", padding: "20px" }}>
            <div style={{ fontSize: "48px", marginBottom: "10px" }}>💉</div>
            <h4 style={{ color: "#c41e3a", margin: "10px 0" }}>Save Lives</h4>
            <p className="small">One donation can save up to three lives</p>
          </div>

          <div style={{ textAlign: "center", padding: "20px" }}>
            <div style={{ fontSize: "48px", marginBottom: "10px" }}>❤️</div>
            <h4 style={{ color: "#c41e3a", margin: "10px 0" }}>Health Benefits</h4>
            <p className="small">Regular donation helps maintain healthy iron levels</p>
          </div>

          <div style={{ textAlign: "center", padding: "20px" }}>
            <div style={{ fontSize: "48px", marginBottom: "10px" }}>🤝</div>
            <h4 style={{ color: "#c41e3a", margin: "10px 0" }}>Community Impact</h4>
            <p className="small">Strengthen your community bonds and help neighbors</p>
          </div>
        </div>
      </div>

      <div className="card" style={{ backgroundColor: "#fff5f5", borderLeft: "4px solid #c41e3a" }}>
        <h3 style={{ color: "#c41e3a" }}>Join Our Community</h3>
        <p style={{ lineHeight: "1.8", marginBottom: "20px" }}>
          Whether you're a donor willing to save lives or someone in need of blood, our platform 
          is here to help. Join thousands of users who are making a difference every day.
        </p>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          <a href="/signup" className="btn btn-primary">Register as Donor</a>
          <a href="/signup" className="btn">Register as Receiver</a>
          <a href="/donors" className="btn">View Our Donors</a>
        </div>
      </div>

    </div>
  );
}
