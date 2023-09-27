const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(res.status(400).json({message: `${contactId} is not valid id.`}));
  }
  next();
};

module.exports = isValidId;
