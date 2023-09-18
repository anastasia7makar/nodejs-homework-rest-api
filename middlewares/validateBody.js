const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json(error.message);
    }
    next();
  };

  return func;
};

const validateUpdateContact = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "missing fields" });
    }

    return next();
  };

  return func;
};

module.exports = { validateBody, validateUpdateContact};
