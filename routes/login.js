const express = require("express");
const {body} = require("express-validator");
const router = express.Router();

const authenticateController = require("../controllers/authenticate")

router.get("/register",authenticateController.getRegister);

router.post("/register",
body("name").isEmpty().withMessage('Password can not be blank'),
body("username").isEmpty().withMessage('Password can not be blank'),
body("password").isEmpty().withMessage('Password can not be blank'),
authenticateController.postRegister);

router.get("/login",authenticateController.getLogin)
router.get("/logout",authenticateController.getLogout)

module.exports = router;