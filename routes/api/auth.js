const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/auth");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/user");
const authenticate = require("../../middlewares/authenticate");
const { validateSubscription } = require("../../middlewares/validateBody");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/",
  authenticate,
  validateSubscription(schemas.updSubscriptionSchema),
  ctrl.updateSubscription
);

module.exports = router;
