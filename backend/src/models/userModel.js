const pool = require("../config/db");

async function findByEmail(email) {
  const [rows] = await pool.query(
    "SELECT id, name, email, password, role, blood_group, phone, created_at FROM users WHERE email = ? LIMIT 1",
    [email]
  );
  return rows[0] || null;
}

async function findById(id) {
  const [rows] = await pool.query(
    "SELECT id, name, email, role, blood_group, phone, created_at FROM users WHERE id = ? LIMIT 1",
    [id]
  );
  return rows[0] || null;
}

async function createUser({ name, email, passwordHash, role, blood_group, phone }) {
  const [result] = await pool.query(
    `INSERT INTO users (name, email, password, role, blood_group, phone)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, passwordHash, role, blood_group || null, phone || null]
  );
  return result.insertId;
}

async function listDonors() {
  const [rows] = await pool.query(
    `SELECT id, name, email, blood_group, phone, created_at
     FROM users
     WHERE role = 'donor'
     ORDER BY created_at DESC`
  );
  return rows;
}

module.exports = {
  findByEmail,
  findById,
  createUser,
  listDonors
};
