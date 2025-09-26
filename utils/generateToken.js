<<<<<<< HEAD
// utils/generateToken.js
=======
>>>>>>> 1e89189f095a8895179521e79a061ba48a2fc9f1
const jwt = require("jsonwebtoken");

function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" } // adjust expiry as needed
  );
}

module.exports = generateToken;
