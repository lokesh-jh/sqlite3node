const express = require("express");
const router = express.Router();
const userController = require("../controllers/user")

router.get("/users",userController.getUsers);
router.get("/adduser",userController.getAddUser);
router.post("/adduser",userController.postAddUser);

module.exports = router;
