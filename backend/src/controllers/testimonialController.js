const testimonialModel = require("../models/testimonialModel");
const { isNonEmptyString } = require("../utils/validators");

// Public endpoint - get approved testimonials
async function getApprovedTestimonials(req, res, next) {
  try {
    const rows = await testimonialModel.listApproved();
    res.json({ testimonials: rows });
  } catch (err) {
    next(err);
  }
}

// Authenticated users can submit testimonials
async function submitTestimonial(req, res, next) {
  try {
    const user_id = req.user.id;
    const { message, rating } = req.body;

    if (!isNonEmptyString(message, 10)) {
      return res.status(400).json({ message: "Message must be at least 10 characters" });
    }

    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const id = await testimonialModel.createTestimonial({
      user_id,
      message: message.trim(),
      rating: rating || null
    });

    res.status(201).json({ message: "Testimonial submitted for review", id });
  } catch (err) {
    next(err);
  }
}

// Admin only - list all testimonials
async function getAllTestimonials(req, res, next) {
  try {
    const rows = await testimonialModel.listAll();
    res.json({ testimonials: rows });
  } catch (err) {
    next(err);
  }
}

// Admin only - approve testimonial
async function approveTestimonial(req, res, next) {
  try {
    const testimonialId = Number(req.params.id);
    const affected = await testimonialModel.updateApproval({ testimonialId, is_approved: true });
    if (!affected) return res.status(404).json({ message: "Testimonial not found" });
    res.json({ message: "Testimonial approved" });
  } catch (err) {
    next(err);
  }
}

// Admin only - reject/unapprove testimonial
async function rejectTestimonial(req, res, next) {
  try {
    const testimonialId = Number(req.params.id);
    const affected = await testimonialModel.updateApproval({ testimonialId, is_approved: false });
    if (!affected) return res.status(404).json({ message: "Testimonial not found" });
    res.json({ message: "Testimonial rejected" });
  } catch (err) {
    next(err);
  }
}

// Admin only - delete testimonial
async function deleteTestimonial(req, res, next) {
  try {
    const testimonialId = Number(req.params.id);
    const affected = await testimonialModel.deleteById(testimonialId);
    if (!affected) return res.status(404).json({ message: "Testimonial not found" });
    res.json({ message: "Testimonial deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getApprovedTestimonials,
  submitTestimonial,
  getAllTestimonials,
  approveTestimonial,
  rejectTestimonial,
  deleteTestimonial
};
