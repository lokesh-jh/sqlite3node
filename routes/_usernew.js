const router = express.Router();
const userController = require("../controllers/user")
const authenticateController = require("../controllers/authenticate")

router.get("/logout",authenticateController.getLogout)
router.get("/profile",userController.getProfile)
router.post("/profile",userController.postEditProfile)
router.get("/viewCart",userController.getViewCart)
router.get("/viewProducts",userController)
router.post("/addToCart",userController.postAddToCart)
router.post("/order",userController.postOrder)
router.get("/viewOrders",userController.getOrders)

module.exports = router;




