const express = require("express");
const {body} = require("express-validator");
const router = express.Router();

const registerController = require("../controllers/register")

router.get("/register",registerController.getRegister);
router.post("/register",
[
    body("username").isEmail().withMessage('Not a valid e-mail address'),
],
registerController.postRegister);
router.get("/login",registerController.getLogin);


module.exports = router;