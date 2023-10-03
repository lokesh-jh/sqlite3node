const express = require("express");
const router = express.Router();
const userController = require("../controllers/user")
const bookController = require("../controllers/book")
const authorController = require("../controllers/author")
const genreController = require("../controllers/genre")

//book related routes from bookcontroller
router.get("/books",bookController.getBooks);
router.get("/addBook",bookController.getAddBook);
router.post("/addBook",bookController.postAddBook);
router.get("/updateBook",bookController.getUpdateBook);
router.post("/updateBook",bookController.postUpdateBook);
router.get("/deleteBook/:id",bookController.getDeleteBook);

//author related routes from authorcontroller
router.get("/authors",authorController.getAuthors);
router.get("/addAuthor",authorController.getAddAuthor);
router.post("/addAuthor",authorController.postAddAuthor);
router.get("/updateAuthor",authorController.getUpdateAuthor);
router.get("/deleteAuthor",authorController.getDeleteAuthor);

//user related routes from usercontroller
router.get("/users",userController.getUsers)
router.get("/deleteUser/:username",userController.getDeleteUser)

//genre related routes from genrecontroller
router.get("/genres",genreController.getGenre)
router.get("/addGenre",genreController.getAddGenre)
router.post("/addGenre",genreController.postAddGenre)
router.get("/updateGenre/:id",genreController.getUpdateGenre)
router.post("/updateGenre/:id",genreController.postUpdateGenre)
router.get("/deleteGenre/:id",genreController.getDeleteGenre)

module.exports = router;











