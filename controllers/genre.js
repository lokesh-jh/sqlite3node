//const Book = require("../models/genre");
const User = require("../models/user");

exports.getGenre = async(req, res) => {
  userlist = await User.findAll();  
  res.render("genre", { userlist});  
};
exports.getAddGenre = (req, res) => {
  res.render("addGenre");
};
exports.postAddGenre = (req, res) => {
  //Book.create(req.body);
  res.redirect("/genre");
};