const express = require("express");

const router = express.Router();

const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/users");
const { validationBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

//Signup
router.post(
  "/signup",
  validationBody(schemas.signupSchema),
  ctrlWrapper(ctrl.signup)
);

//Login
router.post(
  "/login",
  validationBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

//Current
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrentUser));

//Avatar
router.patch("/avatars", authenticate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));

//Logout
router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;
