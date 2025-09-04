// utils/generateToken.js
const jwt = require("jsonwebtoken");

function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" } // adjust expiry as needed
  );
}

module.exports = generateToken;
