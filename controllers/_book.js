const Book = require("../models/book");

exports.getBooks = (req, res) => {
  res.render("books");
};
exports.getAddBook = (req, res) => {
  res.render("addBook");
};
exports.postAddBook = (req, res) => {
  //Book.create(req.body);
  res.redirect("/books", { msg: "book added" });
};
exports.getUpdateBook = (req, res) => {
  res.render("updateBook");
};
exports.postUpdateBook = (req, res) => {
  //some code
  res.redirect("/books", { msg: "book updated" });
};
exports.getDeleteBook = (req, res) => {
  //some code
  res.redirect("/books", { msg: "book deleted" });
};
