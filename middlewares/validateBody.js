const { CustomErrors } = require("../helpers/customErrors");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (!Object.entries(req.body).length)
      throw CustomErrors.BadRequest("missing fields");

    const { error } = schema.validate(req.body);

    if (error) {
      throw CustomErrors.BadRequest(error.message);
    }

    next();
  };

  return func;
};

const validateStatusContact = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      throw CustomErrors.BadRequest("missing field favorite");
    }
    next();
  };

  return func;
};

const validateSubscription = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
   
    if (!Object.entries(req.body).length)
      throw CustomErrors.BadRequest("missing field subscription");
    if (error) {
      throw CustomErrors.BadRequest(error.message);
    }
    next();
  };

  return func;
};
module.exports = { validateBody, validateStatusContact, validateSubscription };
