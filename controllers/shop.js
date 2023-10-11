const express = require("express");
const app = express();
const Book = require("../models/book");

exports.getHome = async(req, res) => {
  const booklist = await Book.findAll();
  console.log(booklist);  
  res.render("home", { booklist});  
};
  
  