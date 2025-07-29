const express = require("express");
const app = express();

// Load environment variables from .env file
require("dotenv").config();

// Middleware to handle CORS
const cors = require("cors");
app.use(cors());

// Middleware to handle URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to handle static files
app.use(express.static("public"));

// Middleware to handle cookie parsing
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
  res.send("<h1>Hello, World!</h1>");
});

// Start the server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
