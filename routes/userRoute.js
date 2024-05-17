const express = require("express");
const router = express.Router();
const {
  registeruser,
  loginuser,
  otpVerify,
  logout,
} = require("../controller/userController");
router.route("/otp").post(otpVerify);

router.route("/login").post(loginuser);

router.route("/signUp").post(registeruser);

router.route("/logout").get(logout);
module.exports = router;
