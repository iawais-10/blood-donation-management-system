function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isNonEmptyString(v, minLen = 1) {
  return typeof v === "string" && v.trim().length >= minLen;
}

function isPositiveInt(n) {
  return Number.isInteger(n) && n > 0;
}

function normalizeBloodGroup(bg) {
  if (typeof bg !== "string") return null;
  const v = bg.trim().toUpperCase();
  const allowed = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  return allowed.includes(v) ? v : null;
}

module.exports = {
  isValidEmail,
  isNonEmptyString,
  isPositiveInt,
  normalizeBloodGroup
};
