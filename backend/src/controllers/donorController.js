const appointmentModel = require("../models/appointmentModel");
const userModel = require("../models/userModel");
const { isNonEmptyString } = require("../utils/validators");

async function getProfile(req, res, next) {
  try {
    const user = await userModel.findById(req.user.id);
    res.json({ user });
  } catch (err) {
    next(err);
  }
}

async function createAppointment(req, res, next) {
  try {
    const donor_id = req.user.id;
    const { appointment_date, appointment_time, notes } = req.body;

    if (!isNonEmptyString(appointment_date, 8)) {
      return res.status(400).json({ message: "Appointment date is required" });
    }
    if (!isNonEmptyString(appointment_time, 3)) {
      return res.status(400).json({ message: "Appointment time is required" });
    }

    const id = await appointmentModel.createAppointment({
      donor_id,
      appointment_date,
      appointment_time,
      notes: notes || null
    });

    res.status(201).json({ message: "Appointment scheduled", id });
  } catch (err) {
    next(err);
  }
}

async function myAppointments(req, res, next) {
  try {
    const donor_id = req.user.id;
    const rows = await appointmentModel.listByDonor(donor_id);
    res.json({ appointments: rows });
  } catch (err) {
    next(err);
  }
}

async function deleteAppointment(req, res, next) {
  try {
    const appointmentId = Number(req.params.id);
    const donor_id = req.user.id;
    const affected = await appointmentModel.deleteAppointment({ appointmentId, donor_id });
    if (!affected) return res.status(404).json({ message: "Appointment not found or unauthorized" });
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getProfile,
  createAppointment,
  myAppointments,
  deleteAppointment
};
