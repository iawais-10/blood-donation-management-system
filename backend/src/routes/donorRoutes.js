const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const { getProfile, createAppointment, myAppointments, deleteAppointment } = require("../controllers/donorController");

router.use(protect, authorize("donor"));

router.get("/profile", getProfile);
router.post("/appointments", createAppointment);
router.get("/appointments", myAppointments);
router.delete("/appointments/:id", deleteAppointment);

module.exports = router;
