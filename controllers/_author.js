const Author = require("../models/author");

exports.getAuthors = (req, res) => {
  res.render("authors",{msg:"here is a list of authors"});
};
exports.getAddAuthor = (req, res) => {
  res.render("addAuthor");
};
exports.postAddAuthor = (req, res) => {
  Author.create(req.body);
  res.redirect("authors", {msg:"author added"})
};
exports.getUpdateAuthor = (req, res) => {
  res.render("updateAuthor");
};
exports.postUpdateAuthor = (req, res) => {
  res.redirect("authors", {msg:"author updated"})
};
exports.postDeleteAuthor = (req, res) => {
  //some code
  res.redirect("authors",{msg:"author deleted"});
};
exports.getDeleteAuthor = (req, res) => {
  //some code
  res.redirect("authors",{msg:"author deleted"});
};
