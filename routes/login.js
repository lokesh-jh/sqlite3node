const express = require("express");
const {body} = require("express-validator");
const router = express.Router();

const authenticateController = require("../controllers/authenticate")

router.get("/register",authenticateController.getRegister);
router.post("/register",
[
    body("username").isEmail().withMessage('Not a valid e-mail address'),
],
authenticateController.postRegister);

router.get("/login",authenticateController.getLogin)
router.get("/logout",authenticateController.getLogout)
module.exports = router;