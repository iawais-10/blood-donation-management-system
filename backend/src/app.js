const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const receiverRoutes = require("./routes/receiverRoutes");
const donorRoutes = require("./routes/donorRoutes");
const adminRoutes = require("./routes/adminRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const publicRoutes = require("./routes/publicRoutes");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "BDMS API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/receiver", receiverRoutes);
app.use("/api/donor", donorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/public", publicRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
