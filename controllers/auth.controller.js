const { signUpSchema, signInSchema } = require("../middlewares/validator");
const User = require("../models/user.model");
const { doHash, doCompare } = require("../utils/hashing");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const { username, email, phoneNumber, password, confirmPassword } = req.body;

  try {
    // Joi Validation must receive an object
    const { error, value } = signUpSchema.validate({
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
      message: "User registered successfully!",
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

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { error, value } = signInSchema.validate({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({
        success: false,
        error: error.details[0].message,
      });
    }

    const existingUser = await User.findOne({ email }).select("+password");

    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "User doesn't exists!",
      });
    }

    const isPasswordValid = await doCompare(password, existingUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials!",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "8h",
      }
    );

    res
      .cookie("Authorization", "Bearer", token, {
        expires: Date.now() + 8 * 3600000,
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        success: true,
        token,
        message: "Logged in successfully!",
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

const signOut = (req, res) => {
  res.clearCookie("Authorization").status(200).json({
    success: true,
    message: "Logged out successfully!",
  });
};

const forgotPassword = async (req, res) => {
  // This function is not implemented yet
  res.status(501).json({
    success: false,
    message: "Forgot password functionality is not implemented yet.",
  });
};

module.exports = { signUp, signIn, signOut, forgotPassword };
