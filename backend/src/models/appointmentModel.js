const pool = require("../config/db");

async function createAppointment({ donor_id, appointment_date, appointment_time, notes }) {
  const [result] = await pool.query(
    `INSERT INTO appointments (donor_id, appointment_date, appointment_time, notes)
     VALUES (?, ?, ?, ?)`,
    [donor_id, appointment_date, appointment_time, notes || null]
  );
  return result.insertId;
}

async function listByDonor(donor_id) {
  const [rows] = await pool.query(
    `SELECT id, donor_id, appointment_date, appointment_time, notes, status, created_at
     FROM appointments
     WHERE donor_id = ?
     ORDER BY appointment_date DESC, appointment_time DESC`,
    [donor_id]
  );
  return rows;
}

async function listAllWithDonor() {
  const [rows] = await pool.query(
    `SELECT a.id, a.donor_id, a.appointment_date, a.appointment_time, a.notes, a.status, a.created_at,
            u.name AS donor_name, u.email AS donor_email, u.blood_group AS donor_blood_group, u.phone AS donor_phone
     FROM appointments a
     JOIN users u ON u.id = a.donor_id
     ORDER BY a.appointment_date DESC, a.appointment_time DESC`
  );
  return rows;
}

async function updateStatus({ appointmentId, status }) {
  const [result] = await pool.query(
    `UPDATE appointments SET status = ? WHERE id = ?`,
    [status, appointmentId]
  );
  return result.affectedRows;
}

async function deleteAppointment({ appointmentId, donor_id }) {
  const [result] = await pool.query(
    `DELETE FROM appointments WHERE id = ? AND donor_id = ?`,
    [appointmentId, donor_id]
  );
  return result.affectedRows;
}

async function deleteAppointmentByAdmin(appointmentId) {
  const [result] = await pool.query(
    `DELETE FROM appointments WHERE id = ?`,
    [appointmentId]
  );
  return result.affectedRows;
}

module.exports = {
  createAppointment,
  listByDonor,
  listAllWithDonor,
  updateStatus,
  deleteAppointment,
  deleteAppointmentByAdmin
};
