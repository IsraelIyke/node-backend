require("dotenv").config(); // Load .env variables
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors"); // <--- add this

const app = express();

// ✅ Enable CORS
app.use(
  cors({
    origin: ["http://localhost:5000"], // allowed origins
    methods: ["GET", "POST", "PUT", "DELETE"], // allowed methods
    credentials: true, // allow cookies/auth headers if needed
  })
);

// Middleware to parse JSON
app.use(express.json());

// Connect Database
connectDB();

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
