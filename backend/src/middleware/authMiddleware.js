const jwt = require("jsonwebtoken");

/**
 * Verifies JWT and attaches user to req.user
 * Expected header: Authorization: Bearer <token>
 */
function protect(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      role: decoded.role,
      name: decoded.name,
      email: decoded.email
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
}

module.exports = { protect };
