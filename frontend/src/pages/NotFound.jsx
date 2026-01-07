import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container">
      <div className="card">
        <h2>Page Not Found</h2>
        <p className="small">The page you requested does not exist.</p>
        <Link className="btn btn-primary" to="/">Go Home</Link>
      </div>
    </div>
  );
}
