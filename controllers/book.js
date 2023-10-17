const Book = require("../models/book");
const Genre = require("../models/genre");
const Author = require("../models/author");
const {validationResult} = require("express-validator");

exports.getBooks = async(req, res) => {  
  const booklist = await Book.findAll();  
  res.render("books", { booklist, loggedin:req.isAuthenticated()});  
};
exports.getAddBook = async(req, res) => {
  const genrelist= await Genre.findAll();
  const authorlist= await Author.findAll();
  res.render("addBook", {genrelist,authorlist,validationError:[],fileError:"",loggedin:req.query.loggedin});
};
exports.postAddBook = async(req, res) => {
  const result = validationResult(req);
  const genrelist= await Genre.findAll();
  const authorlist= await Author.findAll();  
  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];    
  if (!result.isEmpty()) {
    const validationError = result.array();   
    return res.render("addBook", { genrelist,authorlist,validationError,loggedin:req.isAuthenticated()});
  }  
  if (!req.file) {    
    return res.render("addBook", { genrelist,authorlist,validationError:[],fileError:"no file upload",loggedin:req.isAuthenticated()});
      }  
  if (!allowedFileTypes.includes(req.file.mimetype)) {    
    return res.render("addBook", { genrelist,authorlist,validationError:[],fileError:"incorrect filetype",loggedin:req.isAuthenticated()});
  }
  await Book.create(req.body);
  res.redirect("/admin/books?loggedin=true")
}

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
  res.render("books", {booklist,loggedin:req.query.loggedin});
};
