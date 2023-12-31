const express = require("express");
const app = express();
const Book = require("../models/book");

exports.getHome = async (req, res) => {
  const booklist = await Book.findAll();   
  res.render("home", { booklist,loggedin:req.isAuthenticated()});
};
