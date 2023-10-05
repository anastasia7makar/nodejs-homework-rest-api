const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/auth");
const { schemas } = require("../../models/user");
const { validateBody, authenticate, upload, validateSubscription } = require("../../middlewares");
// const { validateBody } = require("../../middlewares");
// const authenticate = require("../../middlewares/authenticate");
// const { validateSubscription } = require("../../middlewares/validateBody");
// const upload = require("../../middlewares/upload");

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

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;
