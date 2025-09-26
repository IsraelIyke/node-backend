const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String }, // optional for Google users

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    googleId: { type: String }, // store Google’s unique user ID
    avatar: { type: String }, // store Google profile picture

    // ✅ Email verification
    isVerified: { type: Boolean, default: false },
    emailVerificationCode: { type: String }, // 5-digit code
    emailVerificationCodeExpires: { type: Date },

    // ✅ Forgot password reset
    resetPasswordCode: { type: String }, // 5-digit OTP
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
