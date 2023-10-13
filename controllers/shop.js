const express = require("express");
const app = express();
const Book = require("../models/book");

exports.getHome = async (req, res) => {
  const booklist = await Book.findAll();
  const loggedin= req.isAuthenticated();
  console.log(loggedin); 
  res.render("home", { booklist });
};
