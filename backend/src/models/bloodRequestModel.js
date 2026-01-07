const pool = require("../config/db");

async function createRequest({ receiver_id, blood_group, quantity, urgency, hospital, city }) {
  const [result] = await pool.query(
    `INSERT INTO blood_requests
      (receiver_id, blood_group, quantity, urgency, hospital, city, status)
     VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
    [receiver_id, blood_group, quantity, urgency, hospital, city]
  );
  return result.insertId;
}

async function listByReceiver(receiver_id) {
  const [rows] = await pool.query(
    `SELECT id, receiver_id, blood_group, quantity, urgency, hospital, city, status, created_at
     FROM blood_requests
     WHERE receiver_id = ?
     ORDER BY created_at DESC`,
    [receiver_id]
  );
  return rows;
}

async function listAll() {
  const [rows] = await pool.query(
    `SELECT br.id, br.receiver_id, br.blood_group, br.quantity, br.urgency, br.hospital, br.city, br.status, br.created_at,
            u.name AS receiver_name, u.email AS receiver_email, u.phone AS receiver_phone
     FROM blood_requests br
     JOIN users u ON u.id = br.receiver_id
     ORDER BY br.created_at DESC`
  );
  return rows;
}

async function updateStatus({ requestId, status }) {
  const [result] = await pool.query(
    `UPDATE blood_requests SET status = ? WHERE id = ?`,
    [status, requestId]
  );
  return result.affectedRows;
}

async function deleteRequest({ requestId, receiver_id }) {
  const [result] = await pool.query(
    `DELETE FROM blood_requests WHERE id = ? AND receiver_id = ?`,
    [requestId, receiver_id]
  );
  return result.affectedRows;
}

async function deleteRequestByAdmin(requestId) {
  const [result] = await pool.query(
    `DELETE FROM blood_requests WHERE id = ?`,
    [requestId]
  );
  return result.affectedRows;
}

module.exports = {
  createRequest,
  listByReceiver,
  listAll,
  updateStatus,
  deleteRequest,
  deleteRequestByAdmin
};
