const checkRequiredFields = (name, email, phone) => {
  const missingFields = [];
  const nonStringFields = [];

  if (!name) {
    missingFields.push("name");
  } else if (typeof name !== "string") {
    nonStringFields.push("name");
  }

  if (!email) {
    missingFields.push("email");
  } else if (typeof email !== "string") {
    nonStringFields.push("email");
  }

  if (!phone) {
    missingFields.push("phone");
  } else if (typeof phone !== "string") {
    nonStringFields.push("phone");
  }

  let errorMessage = "";

  if (missingFields.length > 0) {
    errorMessage += `missing required ${missingFields.join(", ")} fields`;
  }

  if (nonStringFields.length > 0) {
    errorMessage += `${nonStringFields.join(", ")} must be string`;
  }

  return errorMessage;
};

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const name = error._original.name;
      const email = error._original.email;
      const phone = error._original.phone;

      const message = checkRequiredFields(name, email, phone);

      if (error._original) res.status(400).json({ message });
    }

    next();
  };

  return func;
};

module.exports = { validateBody };
