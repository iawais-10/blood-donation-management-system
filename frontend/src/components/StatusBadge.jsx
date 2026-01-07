import React from "react";

export default function StatusBadge({ status }) {
  const s = (status || "").toLowerCase();

  const cls =
    s === "pending"
      ? "badge badge-pending"
      : s === "approved"
      ? "badge badge-approved"
      : s === "rejected"
      ? "badge badge-rejected"
      : s === "delivered"
      ? "badge badge-delivered"
      : "badge";

  return <span className={cls}>{status}</span>;
}
