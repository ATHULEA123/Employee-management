const path = require("path");
exports.renderindex = (req, res) => {
  res.render("index");
};
exports.renderemployeedetails = (req, res) => {
  res.render("index2");
};

exports.renderlogin = (req, res) => {
  res.render("login");
};
exports.rendersignUp = (req, res) => {
  res.render("signUp");
};
exports.renderotpverify = (req, res) => {
  res.render("otp");
};
