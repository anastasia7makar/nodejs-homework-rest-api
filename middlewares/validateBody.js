const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (!Object.entries(req.body).length)
      return res.status(400).json({ message: "missing fields" });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    next();
  };

  return func;
};

const validateStatusContact = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    next();
  };

  return func;
};
module.exports = { validateBody, validateStatusContact };
