const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    const { name, email, phone } = value;

    if (error) {
      if (!name && !email && !phone) {
        return res.status(400).json({ message: "missing fields" });
      }
      return res.status(400).json({ message: error.message });
    }
    next();
  };

  return func;
};

const validateStatusContact = (schema) => {
  func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    next();
  };

  return func;
};
module.exports = { validateBody, validateStatusContact };
