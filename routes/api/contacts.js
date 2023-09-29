const express = require("express");
const ctrl = require("../../controllers/contacts");
const {
  isValidId,
  validateStatusContact,
  validateBody,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");
const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateStatusContact(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
