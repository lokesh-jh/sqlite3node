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
