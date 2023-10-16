const express = require("express");
const app = express();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const {validationResult} = require("express-validator");

exports.getLogin = (req, res) => {
  if (!req.session.messages) {   
    const message = ["you have been logged out"];
  } else {
    console.log(req.session.messages);
  }
  res.render("login", { message: [],msg:"",loggedin:req.isAuthenticated() });
};

exports.getRegister = (req, res) => {
  res.render("register", { validationError:[],loggedin:req.isAuthenticated() });
};

// exports.postRegister = async(req, res) => {
//   console.log(req.body.password)
//   const result = validationResult(req);
//   console.log(result.array())  
//   if (!result.isEmpty()) {
//     const validationError = result.array();
//     console.log(validationError)
//     return res.render("register", {validationError});
//   }  
//   await User.create(req.body);
//   res.redirect("/login")
// };

exports.getLogout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  }); // Passport.js method to log the user out
  res.redirect("/login"); // Redirect to the login page
}

exports.postRegister = async (req, res) => {
  const { username, password, confirmpassword } = req.body;
  const result = validationResult(req);
  console.log(result.errors);
  if (!result.isEmpty()) {
    const valerr = result.errors;
    return res.render("register", { msg: valerr[0].msg,loggedin:req.isAuthenticated() });
  }
  const hashpassword = await bcrypt.hash(password, 8);
  req.body.password = hashpassword;
  try {
    const user = await User.findOne({ where: { username: username } });
    if (user) {
      return res.render("register", { msg: "user exists",loggedin:req.isAuthenticated() });
    } else if (password !== confirmpassword) {
      return res.render("register", { msg: "passwords dont match",loggedin:req.isAuthenticated() });
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



