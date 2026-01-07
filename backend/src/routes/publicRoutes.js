const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");

// Public route - get all donors
router.get("/donors", async (req, res, next) => {
  try {
    const donors = await userModel.listDonors();
    res.json({ donors });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
