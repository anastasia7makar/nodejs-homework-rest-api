const { CustomErrors } = require("../helpers/customErrors");

const customError = (error, req, res, next) => {
  if (error) {
    if (error instanceof CustomErrors) {
      return res.status(error.code).json({ message: error.message });
    }

    res.status(500).json({ message: error });
  }

  next();
};

module.exports = { customError };
