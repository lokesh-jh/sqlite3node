const User = require("../models/user");

exports.getUsers = async(req, res) => {
  userlist = await User.findAll();
  console.log(userlist[0]);
  res.render("users", { userlist});
};

exports.getAddUser = (req, res) => {
  res.render("adduser");
};

exports.postAddUser = async (req, res) => {
  await User.create(req.body);
  res.send("user added");
};

exports.getProfile = (req, res) =>{      
  res.render("profile");
}

exports.getLogout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  }); // Passport.js method to log the user out
  res.redirect("/login"); // Redirect to the login page
}
