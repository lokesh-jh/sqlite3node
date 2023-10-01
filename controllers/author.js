const Author = require("../models/author");
const User = require("../models/user");

exports.getAuthors = async(req, res) => {
  const authorlist = await Author.findAll();
  console.log(authorlist)  
  res.render("authors", { authorlist});  
};

exports.getAddAuthor = (req, res) => {
  res.render("addAuthor");
};
exports.postAddAuthor = async(req, res) => {
  await Author.create(req.body);
  res.redirect("/admin/authors")
};
exports.getUpdateAuthor = (req, res) => {
  res.render("updateAuthor");
};
exports.postUpdateAuthor = (req, res) => {
  res.redirect("/authors")
};
exports.getDeleteAuthor = (req, res) => {
  //some code
  res.redirect("/author/:id");
};

