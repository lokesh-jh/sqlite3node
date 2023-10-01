const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop")
const authController = require("../controllers/authenticate")


router.get("/",shopController.getHome);
router.get("/register",authController.getRegister);
router.post("/register",authController.postRegister);





module.exports = router;