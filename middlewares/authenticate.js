const jwt = require("jsonwebtoken");
const { CustomErrors } = require("../helpers/customErrors");
const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(CustomErrors.Unauthorized());
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(CustomErrors.Unauthorized());
    }
    req.user = user;
    next();
  } catch {
    next(CustomErrors.Unauthorized());
  }
};

module.exports = authenticate;
