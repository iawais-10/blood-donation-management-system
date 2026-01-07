const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { isValidEmail, isNonEmptyString, normalizeBloodGroup } = require("../utils/validators");

function signToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}

/**
 * Public signup (receiver, donor only)
 * Admin signup is not allowed.
 */
async function signup(req, res, next) {
  try {
    const { name, email, password, role, blood_group, phone } = req.body;

    if (!isNonEmptyString(name, 2)) return res.status(400).json({ message: "Name is required" });
    if (!isValidEmail(email)) return res.status(400).json({ message: "Valid email is required" });
    if (!isNonEmptyString(password, 6)) return res.status(400).json({ message: "Password must be at least 6 chars" });

    if (role !== "receiver" && role !== "donor") {
      return res.status(400).json({ message: "Role must be receiver or donor" });
    }

    const existing = await userModel.findByEmail(email);
    if (existing) return res.status(409).json({ message: "Email already in use" });

    let bg = null;
    if (role === "donor") {
      bg = normalizeBloodGroup(blood_group);
      if (!bg) return res.status(400).json({ message: "Valid blood group is required for donors" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = await userModel.createUser({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      passwordHash,
      role,
      blood_group: bg,
      phone: phone || null
    });

    const user = await userModel.findById(userId);
    const token = signToken({ ...user, email: user.email });

    res.status(201).json({
      message: "Signup successful",
      token,
      user
    });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!isValidEmail(email)) return res.status(400).json({ message: "Valid email is required" });
    if (!isNonEmptyString(password, 1)) return res.status(400).json({ message: "Password is required" });

    const user = await userModel.findByEmail(email.trim().toLowerCase());
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user);

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      blood_group: user.blood_group,
      phone: user.phone,
      created_at: user.created_at
    };

    res.json({ message: "Login successful", token, user: safeUser });
  } catch (err) {
    next(err);
  }
}

async function me(req, res, next) {
  try {
    const user = await userModel.findById(req.user.id);
    res.json({ user });
  } catch (err) {
    next(err);
  }
}

module.exports = { signup, login, me };
