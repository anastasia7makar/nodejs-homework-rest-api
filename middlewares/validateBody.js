const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    const name = value.name;
    const email = value.email;
    const phone = value.phone;

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

module.exports = { validateBody };
