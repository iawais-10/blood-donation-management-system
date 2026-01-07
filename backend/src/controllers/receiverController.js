const bloodRequestModel = require("../models/bloodRequestModel");
const { normalizeBloodGroup, isNonEmptyString, isPositiveInt } = require("../utils/validators");

async function createBloodRequest(req, res, next) {
  try {
    const receiver_id = req.user.id;
    const { blood_group, quantity, urgency, hospital, city } = req.body;

    const bg = normalizeBloodGroup(blood_group);
    if (!bg) return res.status(400).json({ message: "Invalid blood group" });

    const qty = Number(quantity);
    if (!Number.isInteger(qty) || qty <= 0) return res.status(400).json({ message: "Quantity must be a positive integer" });

    if (!isNonEmptyString(urgency, 2)) return res.status(400).json({ message: "Urgency is required" });
    if (!isNonEmptyString(hospital, 2)) return res.status(400).json({ message: "Hospital name is required" });
    if (!isNonEmptyString(city, 2)) return res.status(400).json({ message: "City is required" });

    const id = await bloodRequestModel.createRequest({
      receiver_id,
      blood_group: bg,
      quantity: qty,
      urgency: urgency.trim(),
      hospital: hospital.trim(),
      city: city.trim()
    });

    res.status(201).json({ message: "Blood request created", id });
  } catch (err) {
    next(err);
  }
}

async function myRequests(req, res, next) {
  try {
    const receiver_id = req.user.id;
    const rows = await bloodRequestModel.listByReceiver(receiver_id);
    res.json({ requests: rows });
  } catch (err) {
    next(err);
  }
}

async function deleteRequest(req, res, next) {
  try {
    const requestId = Number(req.params.id);
    const receiver_id = req.user.id;
    const affected = await bloodRequestModel.deleteRequest({ requestId, receiver_id });
    if (!affected) return res.status(404).json({ message: "Request not found or unauthorized" });
    res.json({ message: "Request deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createBloodRequest,
  myRequests,
  deleteRequest
};
