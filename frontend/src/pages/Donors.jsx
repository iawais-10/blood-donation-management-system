import React, { useEffect, useState } from "react";
import { getPublicDonors } from "../services/publicService";

export default function Donors() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    loadDonors();
  }, []);

  async function loadDonors() {
    setLoading(true);
    setError("");
    try {
      const data = await getPublicDonors();
      setDonors(data.donors || []);
    } catch (err) {
      setError("Failed to load donors");
    } finally {
      setLoading(false);
    }
  }

  const filteredDonors = donors.filter(d => {
    if (!filter) return true;
    return d.blood_group === filter;
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="container">
      <div className="card">
        <h2>Our Donors</h2>
        <p className="small">
          Meet our amazing donors who are saving lives through their generous contributions. 
          These heroes make blood donation possible and accessible to those in need.
        </p>
      </div>

      <div className="card">
        <h3>Filter by Blood Group</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button 
            className={!filter ? "btn btn-primary" : "btn"} 
            onClick={() => setFilter("")}
          >
            All
          </button>
          {bloodGroups.map(bg => (
            <button 
              key={bg}
              className={filter === bg ? "btn btn-primary" : "btn"} 
              onClick={() => setFilter(bg)}
            >
              {bg}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="card">
          <p className="small">Loading donors...</p>
        </div>
      ) : error ? (
        <div className="card">
          <div className="error">{error}</div>
        </div>
      ) : filteredDonors.length === 0 ? (
        <div className="card">
          <p className="small">
            {filter ? `No donors found with blood group ${filter}` : "No donors registered yet."}
          </p>
        </div>
      ) : (
        <>
          <div className="card">
            <h3>
              {filter ? `Donors with Blood Group ${filter}` : "All Donors"} 
              <span style={{ color: "#666", fontWeight: "normal", marginLeft: "10px" }}>
                ({filteredDonors.length})
              </span>
            </h3>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
            {filteredDonors.map((d) => (
              <div className="card" key={d.id}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                  <div style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: "#c41e3a",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginRight: "15px"
                  }}>
                    {d.blood_group || "?"}
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "18px" }}>{d.name}</h3>
                    <p className="small" style={{ margin: "5px 0 0 0", color: "#666" }}>
                      Blood Group: <b>{d.blood_group || "Not specified"}</b>
                    </p>
                  </div>
                </div>
                
                {d.phone && (
                  <p className="small" style={{ margin: "8px 0" }}>
                    📞 {d.phone}
                  </p>
                )}
                
                <p className="small" style={{ margin: "8px 0", color: "#666" }}>
                  Registered: {new Date(d.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
