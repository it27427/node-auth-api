const { signUpSchema } = require("../middlewares/validator");
const User = require("../models/user.model");
const { doHash } = require("../utils/hashing");

const signUp = async (req, res) => {
  const { username, email, phoneNumber, password, confirmPassword } = req.body;

  try {
    // Joi Validation must receive an object
    const { error } = signUpSchema.validate({
      username,
      email,
      phoneNumber,
      password,
      confirmPassword,
    });

    if (error) {
      return res.status(401).json({
        success: false,
        error: error.details[0].message,
      });
    }

    // Check for existing user by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "User already exists!",
      });
    }

    // Hash password
    const hashedPassword = await doHash(password, 12);

    // Create new user (don’t save confirmPassword)
    const newUser = new User({
      username,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    const result = await newUser.save();

    result.password = undefined; // Remove password from response

    res.status(201).json({
      success: true,
      message: "User signed up successfully",
      result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

const signIn = async (req, res) => {};

module.exports = { signUp, signIn };
