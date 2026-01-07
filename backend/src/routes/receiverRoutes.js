const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const { createBloodRequest, myRequests, deleteRequest } = require("../controllers/receiverController");

router.use(protect, authorize("receiver"));

router.post("/requests", createBloodRequest);
router.get("/requests", myRequests);
router.delete("/requests/:id", deleteRequest);

module.exports = router;
