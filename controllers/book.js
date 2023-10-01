const Book = require("../models/book");

exports.getBooks = async(req, res) => {
  const booklist = await Book.findAll();
  console.log(booklist);  
  res.render("books", { booklist});  
};
exports.getAddBook = (req, res) => {
  res.render("addBook");
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
