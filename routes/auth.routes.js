const express = require("express");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    // Handle user signup logic here
    res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
