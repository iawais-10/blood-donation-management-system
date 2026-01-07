import React from "react";

export default function Footer() {
  return (
    <footer style={{
      marginTop: "auto",
      padding: "20px",
      backgroundColor: "#f8f9fa",
      borderTop: "1px solid #e0e0e0",
      marginLeft: 0,
      marginRight: 0
    }}>
      <div style={{ maxWidth: "100%", margin: "0 auto", paddingLeft: 20, paddingRight: 20 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginBottom: "15px",
          alignItems: "start"
        }}>
          {/* About Section */}
          <div>
            <h3 style={{ marginTop: 0, marginBottom: "8px", fontSize: "14px", fontWeight: 600, color: "#111" }}>Blood Donation Management</h3>
            <p className="small" style={{ color: "#666", lineHeight: "1.4", margin: 0, fontSize: "12px" }}>
              Connecting donors, receivers, and administrators to save lives.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ marginTop: 0, marginBottom: "8px", fontSize: "14px", fontWeight: 600, color: "#111" }}>Quick Links</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", gap: "15px", flexWrap: "wrap" }}>
              <li>
                <a href="/" style={{ color: "#666", textDecoration: "none", fontSize: "12px", transition: "color 0.3s ease" }} onMouseEnter={(e) => e.target.style.color = "#dc3545"} onMouseLeave={(e) => e.target.style.color = "#666"}>Home</a>
              </li>
              <li>
                <a href="/about" style={{ color: "#666", textDecoration: "none", fontSize: "12px", transition: "color 0.3s ease" }} onMouseEnter={(e) => e.target.style.color = "#dc3545"} onMouseLeave={(e) => e.target.style.color = "#666"}>About Us</a>
              </li>
              <li>
                <a href="/donors" style={{ color: "#666", textDecoration: "none", fontSize: "12px", transition: "color 0.3s ease" }} onMouseEnter={(e) => e.target.style.color = "#dc3545"} onMouseLeave={(e) => e.target.style.color = "#666"}>Donors</a>
              </li>
              <li>
                <a href="/stories" style={{ color: "#666", textDecoration: "none", fontSize: "12px", transition: "color 0.3s ease" }} onMouseEnter={(e) => e.target.style.color = "#dc3545"} onMouseLeave={(e) => e.target.style.color = "#666"}>Stories</a>
              </li>
              <li>
                <a href="/contact" style={{ color: "#666", textDecoration: "none", fontSize: "12px", transition: "color 0.3s ease" }} onMouseEnter={(e) => e.target.style.color = "#dc3545"} onMouseLeave={(e) => e.target.style.color = "#666"}>Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 style={{ marginTop: 0, marginBottom: "8px", fontSize: "14px", fontWeight: 600, color: "#111" }}>Contact Us</h3>
            <p className="small" style={{ color: "#666", marginBottom: "4px", margin: 0, fontSize: "12px" }}>
              📧 support@bdms.com
            </p>
            <p className="small" style={{ color: "#666", marginBottom: "4px", margin: 0, fontSize: "12px" }}>
              📞 +92-300-1234567
            </p>
            <p className="small" style={{ color: "#666", margin: 0, fontSize: "12px" }}>
              📍 Karachi, Pakistan
            </p>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid #e0e0e0",
          paddingTop: "10px",
          textAlign: "center"
        }}>
          <p className="small" style={{ color: "#666", margin: 0, fontSize: "11px" }}>
            © 2026 Blood Donation Management System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
