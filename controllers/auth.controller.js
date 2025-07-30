const signUp = async (req, res) => {
  const { username, email, phoneNumber, password, confirmPassword } = req.body;

  try {
    // Handle user signup logic here
    res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" }, error);
  }
};

module.exports = {
  signUp,
};
