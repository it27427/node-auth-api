const express = require("express");
const app = express();

// Load environment variables from .env file
require("dotenv").config();

// Middlewares Import
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("public"));

// Sample route
app.get("/", (req, res) => {
  res.send("<h1>Hello, World!</h1>");
});

// Start the server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
