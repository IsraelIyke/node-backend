require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

// Include CORS to restrict frontend access
app.use(
  cors({
    origin: "*", // This is my frontend. You can change it the url you want to allow access
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// to parse JSON
app.use(express.json());

// API Key Middleware (Include if you want but not really necessary)
// app.use((req, res, next) => {
//   const apiKey = req.headers["x-api-key"];
//   if (apiKey !== process.env.API_KEY) {
//     return res.status(403).json({ message: "Forbidden: Invalid API key" });
//   }
//   next();
// });

// This will connect the Mongo Database
connectDB();

// My routes from "./routes/userRoutes"
const userRoutes = require("./routes/userRoutes");
app.use("/api/auth", userRoutes);

//Choose any port you want your server to run in
//Also you can include this part in .env instead of adding it here
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
