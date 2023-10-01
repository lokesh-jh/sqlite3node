const express = require("express");
const router = express.Router();
const userController = require("../controllers/user")
const authenticateController = require("../controllers/authenticate")

router.get("/logout",authenticateController.getLogout)
router.get("/profile",userController.getProfile)
router.post("/updateprofile",userController.postUpdateProfile)
router.get("/cart",userController.getCart)
router.get("/viewProducts",userController.getProducts)
router.get("/addtocart/:id",userController.getAddtoCart)
router.get("/orders",userController.getOrders)

module.exports = router;




