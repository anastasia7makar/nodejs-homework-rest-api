const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const EMAIL_REGEX =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const PASS_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: EMAIL_REGEX,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

const registerSchema = Joi.object({
  email: Joi.string().pattern(EMAIL_REGEX).required().messages({
    "string.pattern.base":
      "Email may contain letters, numbers, an apostrophe, and must be followed by '@' domain name '.' domain suffix. For example Example@ukr.ua, Example@gmail.com, Example1234@hotmail.com",
  }),
  password: Joi.string().pattern(PASS_REGEX).required().messages({
    "string.pattern.base":
      "Password must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters. For example AdrS34567, 5Rdeostr.",
  }),
  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(EMAIL_REGEX).required().messages({
    "string.pattern.base":
      "Email may contain letters, numbers, an apostrophe, and must be followed by '@' domain name '.' domain suffix. For example Example@ukr.ua, Example@gmail.com, Example1234@hotmail.com",
  }),
  password: Joi.string().pattern(PASS_REGEX).required().messages({
    "string.pattern.base":
      "Password must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters. For example AdrS34567, 5Rdeostr.",
  }),
});

const updSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({
      "any.only":
        "Subscription must have one of the following values ​​['starter', 'pro', 'business']",
    }),
});

const schemas = {
  registerSchema,
  loginSchema,
  updSubscriptionSchema,
};

module.exports = {
  User,
  schemas,
};
