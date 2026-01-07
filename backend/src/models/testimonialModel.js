const pool = require("../config/db");

async function createTestimonial({ user_id, message, rating }) {
  const [result] = await pool.query(
    `INSERT INTO testimonials (user_id, message, rating, is_approved)
     VALUES (?, ?, ?, FALSE)`,
    [user_id, message, rating || null]
  );
  return result.insertId;
}

async function listApproved() {
  const [rows] = await pool.query(
    `SELECT t.id, t.message, t.rating, t.created_at,
            u.name AS user_name, u.role AS user_role
     FROM testimonials t
     JOIN users u ON u.id = t.user_id
     WHERE t.is_approved = TRUE
     ORDER BY t.created_at DESC`
  );
  return rows;
}

async function listAll() {
  const [rows] = await pool.query(
    `SELECT t.id, t.message, t.rating, t.is_approved, t.created_at,
            u.name AS user_name, u.email AS user_email, u.role AS user_role
     FROM testimonials t
     JOIN users u ON u.id = t.user_id
     ORDER BY t.created_at DESC`
  );
  return rows;
}

async function updateApproval({ testimonialId, is_approved }) {
  const [result] = await pool.query(
    `UPDATE testimonials SET is_approved = ? WHERE id = ?`,
    [is_approved, testimonialId]
  );
  return result.affectedRows;
}

async function deleteById(testimonialId) {
  const [result] = await pool.query(
    `DELETE FROM testimonials WHERE id = ?`,
    [testimonialId]
  );
  return result.affectedRows;
}

module.exports = {
  createTestimonial,
  listApproved,
  listAll,
  updateApproval,
  deleteById
};
