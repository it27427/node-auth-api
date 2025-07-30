const Joi = require("joi");

const signUpSchema = Joi.object({
  username: Joi.string().min(3).max(40).required().trim(),
  email: Joi.string().min(6).max(50).email().required().trim().lowercase(),
  phoneNumber: Joi.string().min(11).required(),
  password: Joi.string()
    .min(6)
    .required()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,}$")),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

module.exports = { signUpSchema };
