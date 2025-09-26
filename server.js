require("dotenv").config(); // Load .env variables
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

// ✅ CORS (restrict to your frontend domain)
app.use(
  cors({
    origin: ["http://localhost:3000"], // change to your Next.js domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware to parse JSON
app.use(express.json());

// ✅ API Key Middleware (before routes)
// app.use((req, res, next) => {
//   const apiKey = req.headers["x-api-key"];
//   if (apiKey !== process.env.API_KEY) {
//     return res.status(403).json({ message: "Forbidden: Invalid API key" });
//   }
//   next();
// });

// Connect Database
connectDB();

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/auth", userRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
