const {
  validateBody,
  validateStatusContact,
} = require("../middlewares/validateBody");

const isValidId = require("../middlewares/isValidId");

module.exports = {
  isValidId,
  validateBody,
  validateStatusContact,
};
