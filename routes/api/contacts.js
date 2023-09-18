const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody, validateUpdateContact } = require("../../middlewares/validateBody");
const { addSchema } = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(addSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", validateUpdateContact(addSchema), ctrl.updateContact);

module.exports = router;
