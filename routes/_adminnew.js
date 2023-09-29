const express = require("express");
const router = express.Router();
const userController = require("../controllers/user")
const bookController = require("../controllers/book")
const authorController = require("../controllers/author")
const genreController = require("../controllers/genre")

//book related routes
router.get(listBooks)
router.get(addBook)
router.post(addBook)
router.get(updateBook)
router.post(updateBook)
router.get(deleteBook)

//user related routes
router.get(listUsers)
router.post(listUsers)

//author related routes
router.get(listAuthors)
router.get(addAuthor)
router.post(addAuthor)
router.get(updateAuthor)
router.post(updateAuthor)
router.get(deleteAuthor)

//genre related routes
router.get(listGenre)
router.get(addGenre)
router.post(addGenre)

module.exports = router;











