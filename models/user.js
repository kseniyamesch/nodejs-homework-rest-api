const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaValidationErrors } = require("../helpers");

const emailRegexp = /^[\w.]+@[\w]+.[\w]+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
      required: true
    },
    token: {
      type: String,
      default: "",
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: true,
    }
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSchemaValidationErrors);

const signupSchema = Joi.object({
  password: Joi.string().min(6).required(),
  repeat_password: Joi.ref("password"),
  email: Joi.string().pattern(emailRegexp).required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
  signupSchema,
  loginSchema,
  verifyEmailSchema
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
