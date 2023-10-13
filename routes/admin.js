const express = require("express");
const router = express.Router();
const userController = require("../controllers/user")
const bookController = require("../controllers/book")
const authorController = require("../controllers/author")
const genreController = require("../controllers/genre")
const roleController = require("../controllers/role")
const {body} = require("express-validator");

//book related routes from bookcontroller
router.get("/books",bookController.getBooks);
router.get("/addBook",bookController.getAddBook);

router.post("/addBook",
body("title").notEmpty().withMessage('Title can not be blank'),
body("author").notEmpty().withMessage('Author can not be blank'),
body("price").notEmpty().withMessage('Price can not be blank'),
body("price").isInt().withMessage('Price must be a number'),
body("publishDate").isDate(),
body("publishDate").notEmpty().withMessage('Publish date can not be blank'),
body("publishDate").isBefore(new Date().toISOString().split('T')[0]).withMessage('Publish date must be before today'),
bookController.postAddBook);

router.get("/updateBook",bookController.getUpdateBook);
router.post("/updateBook",bookController.postUpdateBook);
router.get("/deleteBook/:id",bookController.getDeleteBook);

//author related routes from authorcontroller
router.get("/authors",authorController.getAuthors);
router.get("/addAuthor",authorController.getAddAuthor);

router.post("/addAuthor",
body("name").notEmpty().withMessage('name can not be blank'),
body("address").notEmpty().withMessage('address can not be blank'),
authorController.postAddAuthor);

router.get("/updateAuthor/:id",authorController.getUpdateAuthor);
router.post("/updateAuthor/:id",authorController.postUpdateAuthor);
router.get("/deleteAuthor/:id",authorController.getDeleteAuthor);

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

//genre related routes from genrecontroller
router.get("/roles",roleController.getRole)
router.get("/addRole",roleController.getAddRole)

router.post("/addRole",
body("role").notEmpty().withMessage('role can not be blank'),
roleController.postAddRole);

router.get("/updateRole/:id",roleController.getUpdateRole)
router.post("/updateRole/:id",roleController.postUpdateRole)
router.get("/deleteRole/:id",roleController.getDeleteRole)

module.exports = router;











