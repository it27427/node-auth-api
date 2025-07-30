const mongoose = require("mongoose");

// User schema definition
// This schema defines the structure of user documents in the MongoDB database
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      minLength: [3, "Username must be at least 3 characters long."],
      maxLength: [40, "Username can't be at more than 40 characters long."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "E-mail is required."],
      trim: true,
      unique: [true, "E-mail must be unique."],
      minLength: [5, "E-mail must be at least 5 characters long."],
      maxLength: [50, "E-mail can't be more than 50 characters long."],
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid e-mail address.",
      ],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      unique: [true, "E-mail must be unique."],
      minLength: [11, "Phone number must be at least 11 characters long."],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 6 characters long."],
    },
    confirmPassword: {
      type: String,
      required: [true, "Confirm password is required"],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      select: false,
    },
    verificationCodeValidation: {
      type: Number,
      select: false,
    },
    forgotPasswordCode: {
      type: String,
      select: false,
    },
    forgotPasswordCodeValidation: {
      type: Number,
      select: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
