require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

// Initialize Express App
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("dev"));

// Import Routes
const userRoutes = require("./routes/userRoutes");
const internshipRoutes  = require('./routes/internshipRoutes')
const hackathonRoutes = require('./routes/hackathonRoutes')

// Mount Routes
app.use("/api/users", userRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/hackathon',hackathonRoutes)


// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Default Route
app.get("/", (req, res) => {
  res.send("ElevateAI API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;