const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
// const otpGenerator = require("otp-generator");
// const jwt = require('jsonwebtoken');
const User = require("../model/userModel");
const { transporter, sendOTP } = require("../config/otpgenerator");

//otp genaration function

function otpGeneration() {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expirationOfOtp = Date.now() + 2 * 60 * 1000;

  return { otp, expirationOfOtp };
}

//@descr register
//@route post/api/register
//@access  public

const registeruser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("all Fields are required");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.render("signUp", {
      alreadyExists: "user exists. change the mail ",
    });
  } else {
    const hashPassword = await bcrypt.hash(password, 10);

    const { otp, expirationOfOtp } = otpGeneration();

    req.session.signupData = {
      username,
      email,
      password: hashPassword,
      otpGeneration: otp,
      expirationOfOtp,
    };

    sendOTP(email, otp); //send OTP to email

    return res.redirect("/otp");
  }
});

const otpVerify = asyncHandler(async (req, res) => {
  const { otp } = req.body;
  if (!req.session.signupData) {
    return res.render("otp", {
      error: " data not found. please try again.",
    });
  }

  const { username, email, password, otpGeneration, expirationOfOtp } =
    req.session.signupData;

  if (Date.now() > expirationOfOtp) {
    delete req.session.signupData;
    return res.render("otp", {
      otpMismatch: "OTP has expired. Please request a new one.",
    });
  }

  if (otp === otpGeneration) {
    const userdata = await User.create({
      username,
      email,
      password,
    });

    delete req.session.signupData;

    console.log(userdata);
    return res.redirect("/login");
  } else {
    return res.render("/otp", {
      error: "incorrect otp",
    });
  }
});
// // login userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr

const loginuser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .render("login", { emailNotFound: "User not found" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      req.session.isAuth = true;
      res.redirect("/");
    } else {
      return res
        .status(404)
        .render("login", { wrongPassword: "Wrong password" });
    }
  } catch (error) {
    console.error(error);
    return res.send("Error during login");
  }
});
// logoutcontroller

const logout = asyncHandler(async (req,res) => {
  console.log("before destroying session",req.sessionID);
  req.session.destroy((error) => {
    if(error){
      console.error(error);
      res.status(500).json({message:"Server error"});
    }else{
      console.log("after destroying session ", req.sessionID);
      res.clearCookie("connect.sid");
      res.redirect("/login");
    }
  })
})



module.exports = { registeruser, loginuser, otpVerify ,logout};
