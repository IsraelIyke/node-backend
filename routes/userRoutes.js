const express = require("express");
const router = express.Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  googleLogin,
} = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const generateToken = require("../utils/generateToken");

// Example protected route
router.get("/profile", auth, (req, res) => {
  res.json({
    message: `Hello ${req.user.email}, role: ${req.user.role} this is your profile`,
  });
});

// Admin-only route
router.get("/admin/users", auth, authorizeRoles("admin"), getUsers);

// User-only route (example)
router.get("/me", auth, authorizeRoles("user"), (req, res) => {
  res.json({ message: `User profile for ${req.user.email}` });
});

// GET all users
router.get("/", getUsers);

// POST create new user
router.post("/", createUser);

// PUT update user by ID
router.put("/:id", updateUser);

// DELETE user by ID
router.delete("/:id", deleteUser);

// Generate random 5-digit code
function generateCode() {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

router.post("/login", loginUser);
router.post("/google-login", googleLogin);

/**
 * Register user
 */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationCode = generateCode();

    user = new User({
      name,
      email,
      password: hashedPassword,
      emailVerificationCode: verificationCode,
      emailVerificationCodeExpires: Date.now() + 15 * 60 * 1000, // 15 min expiry
    });

    await user.save();

    await sendEmail(
      email,
      "Verify your account",
      `Your verification code is ${verificationCode}`
    );

    res.json({ message: "User registered. Verification code sent to email." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * Verify account
 */

router.post("/verify-code", async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isVerified)
      return res.status(400).json({ message: "Account already verified" });

    if (
      user.emailVerificationCode !== code ||
      user.emailVerificationCodeExpires < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    // Mark as verified
    user.isVerified = true;
    user.emailVerificationCode = undefined;
    user.emailVerificationCodeExpires = undefined;
    await user.save();

    // Generate JWT
    const token = generateToken(user);

    res.json({
      message: "Account verified successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * Resend verification code
 */
router.post("/resend-code", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isVerified) return res.json({ message: "Already verified" });

    const verificationCode = generateCode();
    user.emailVerificationCode = verificationCode;
    user.emailVerificationCodeExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    await sendEmail(
      email,
      "Resend verification code",
      `Your code is ${verificationCode}`
    );

    res.json({ message: "Verification code resent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * Forgot password request
 */
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const resetCode = generateCode();
    user.resetPasswordCode = resetCode;
    user.resetCodeExpiresAt = Date.now() + 15 * 60 * 1000;
    await user.save();

    await sendEmail(
      email,
      "Password Reset Code",
      `Your password reset code is ${resetCode}`
    );

    res.json({ message: "Password reset code sent to email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * Reset password
 */
router.post("/reset-password", async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (
      user.resetPasswordCode !== code ||
      user.resetCodeExpiresAt < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordCode = undefined;
    user.resetCodeExpiresAt = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
