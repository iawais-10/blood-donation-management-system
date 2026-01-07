const bloodRequestModel = require("../models/bloodRequestModel");
const userModel = require("../models/userModel");
const appointmentModel = require("../models/appointmentModel");

async function listAllRequests(req, res, next) {
  try {
    const rows = await bloodRequestModel.listAll();
    res.json({ requests: rows });
  } catch (err) {
    next(err);
  }
}

async function approveRequest(req, res, next) {
  try {
    const requestId = Number(req.params.id);
    const affected = await bloodRequestModel.updateStatus({ requestId, status: "approved" });
    if (!affected) return res.status(404).json({ message: "Request not found" });
    res.json({ message: "Request approved" });
  } catch (err) {
    next(err);
  }
}

async function rejectRequest(req, res, next) {
  try {
    const requestId = Number(req.params.id);
    const affected = await bloodRequestModel.updateStatus({ requestId, status: "rejected" });
    if (!affected) return res.status(404).json({ message: "Request not found" });
    res.json({ message: "Request rejected" });
  } catch (err) {
    next(err);
  }
}

async function markDelivered(req, res, next) {
  try {
    const requestId = Number(req.params.id);
    const affected = await bloodRequestModel.updateStatus({ requestId, status: "delivered" });
    if (!affected) return res.status(404).json({ message: "Request not found" });
    res.json({ message: "Request marked as delivered" });
  } catch (err) {
    next(err);
  }
}

async function listDonors(req, res, next) {
  try {
    const rows = await userModel.listDonors();
    res.json({ donors: rows });
  } catch (err) {
    next(err);
  }
}

async function listAppointments(req, res, next) {
  try {
    const rows = await appointmentModel.listAllWithDonor();
    res.json({ appointments: rows });
  } catch (err) {
    next(err);
  }
}

async function approveAppointment(req, res, next) {
  try {
    const appointmentId = Number(req.params.id);
    const affected = await appointmentModel.updateStatus({ appointmentId, status: "approved" });
    if (!affected) return res.status(404).json({ message: "Appointment not found" });
    res.json({ message: "Appointment approved" });
  } catch (err) {
    next(err);
  }
}

async function rejectAppointment(req, res, next) {
  try {
    const appointmentId = Number(req.params.id);
    const affected = await appointmentModel.updateStatus({ appointmentId, status: "rejected" });
    if (!affected) return res.status(404).json({ message: "Appointment not found" });
    res.json({ message: "Appointment rejected" });
  } catch (err) {
    next(err);
  }
}

async function stats(req, res, next) {
  try {
    const requests = await bloodRequestModel.listAll();
    const donors = await userModel.listDonors();
    const appointments = await appointmentModel.listAllWithDonor();

    const counts = {
      totalRequests: requests.length,
      pending: requests.filter(r => r.status === "pending").length,
      approved: requests.filter(r => r.status === "approved").length,
      rejected: requests.filter(r => r.status === "rejected").length,
      delivered: requests.filter(r => r.status === "delivered").length,
      totalDonors: donors.length,
      totalAppointments: appointments.length,
      pendingAppointments: appointments.filter(a => a.status === "pending").length,
      approvedAppointments: appointments.filter(a => a.status === "approved").length,
      rejectedAppointments: appointments.filter(a => a.status === "rejected").length
    };

    res.json({ counts });
  } catch (err) {
    next(err);
  }
}

async function deleteRequest(req, res, next) {
  try {
    const requestId = Number(req.params.id);
    const affected = await bloodRequestModel.deleteRequestByAdmin(requestId);
    if (!affected) return res.status(404).json({ message: "Request not found" });
    res.json({ message: "Request deleted" });
  } catch (err) {
    next(err);
  }
}

async function deleteAppointment(req, res, next) {
  try {
    const appointmentId = Number(req.params.id);
    const affected = await appointmentModel.deleteAppointmentByAdmin(appointmentId);
    if (!affected) return res.status(404).json({ message: "Appointment not found" });
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listAllRequests,
  approveRequest,
  rejectRequest,
  markDelivered,
  listDonors,
  listAppointments,
  approveAppointment,
  rejectAppointment,
  stats,
  deleteRequest,
  deleteAppointment
};
