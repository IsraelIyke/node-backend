require("dotenv").config(); // Load .env variables
const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect Database
connectDB();

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
