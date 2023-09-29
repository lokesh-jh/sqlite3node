const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pages")

router.get("/");
router.get("/register");
router.post("/register");
router.get("/login");
router.post("/login");

module.exports = router;



