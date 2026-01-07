const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { getApprovedTestimonials, submitTestimonial } = require("../controllers/testimonialController");

// Public route - get approved testimonials
router.get("/", getApprovedTestimonials);

// Protected route - submit testimonial
router.post("/", protect, submitTestimonial);

module.exports = router;
