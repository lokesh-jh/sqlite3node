const Book = require("../models/book");
const Genre = require("../models/genre");
const Author = require("../models/author");

exports.getBooks = async(req, res) => {
  const booklist = await Book.findAll();
  console.log(booklist);  
  res.render("books", { booklist});  
};
exports.getAddBook = async(req, res) => {
  const genrelist= await Genre.findAll();
  const authorlist= await Author.findAll();
  res.render("addBook", {genrelist,authorlist});
};
exports.postAddBook = async(req, res) => {
  await Book.create(req.body);
  res.redirect("/admin/books")
};
exports.getUpdateBook = (req, res) => {
  res.render("updateBook");
};
exports.postUpdateBook = (req, res) => {
  //some code
  res.redirect("/books");
};

exports.getDeleteBook = async(req, res) => {
    await Book.destroy({
    where: {
      id: req.params.id
    }
  });
  const booklist = await Book.findAll();
  res.render("books", {booklist});
};
