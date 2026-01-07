/**
 * Role-based guard.
 * Usage: authorize("admin") or authorize("receiver", "admin")
 */
function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user?.role) {
      return res.status(401).json({ message: "Not authorized" });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }
    next();
  };
}

module.exports = { authorize };
