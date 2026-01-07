const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const {
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
} = require("../controllers/adminController");
const {
  getAllTestimonials,
  approveTestimonial,
  rejectTestimonial,
  deleteTestimonial
} = require("../controllers/testimonialController");

router.use(protect, authorize("admin"));

router.get("/requests", listAllRequests);
router.patch("/requests/:id/approve", approveRequest);
router.patch("/requests/:id/reject", rejectRequest);
router.patch("/requests/:id/deliver", markDelivered);
router.delete("/requests/:id", deleteRequest);

router.get("/donors", listDonors);
router.get("/appointments", listAppointments);
router.patch("/appointments/:id/approve", approveAppointment);
router.patch("/appointments/:id/reject", rejectAppointment);
router.delete("/appointments/:id", deleteAppointment);
router.get("/testimonials", getAllTestimonials);
router.patch("/testimonials/:id/approve", approveTestimonial);
router.patch("/testimonials/:id/reject", rejectTestimonial);
router.delete("/testimonials/:id", deleteTestimonial);
router.get("/stats", stats);

module.exports = router;
