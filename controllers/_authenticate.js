const express = require("express");
const app = express();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.getLogin = (req, res) => {
  if (!req.session.messages) {
    //console.log("logged out")
    const message = ["you have been logged out"];
  } else {
    console.log(req.session.messages);
  }
  res.render("login", { message: [] });
};

exports.getRegister = (req, res) => {
  res.render("register", { msg: "" });
};

exports.postRegister = async (req, res) => {
  const { username, password, confirmpassword } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const valerr = errors.errors;
    return res.render("register", { msg: valerr[0].msg });
  }
  const hashpassword = await bcrypt.hash(password, 8);
  req.body.password = hashpassword;
  try {
    const user = await User.findOne({ where: { username: username } });
    if (user) {
      return res.render("register", { msg: "user exists" });
    } else if (password !== confirmpassword) {
      return res.render("register", { msg: "passwords dont match" });
    }
  } catch (err) {
    console.log(err);
  }

  try {
    await User.create(req.body);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

exports.getLogout = (req, res) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
    }); // Passport.js method to log the user out
    res.redirect("/login"); // Redirect to the login page
  }
