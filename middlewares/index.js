const { validateBody, validateStatusContact, validateSubscription } = require("./validateBody");

const isValidId = require("./isValidId");

const authenticate = require("./authenticate");
const upload = require("./upload");

module.exports = {
  isValidId,
  validateBody,
  validateStatusContact,
  validateSubscription,
  authenticate,
  upload,
};
