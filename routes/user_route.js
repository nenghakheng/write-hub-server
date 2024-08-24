const userController = require("../controllers/user_controller");
const router = require("express").Router();

// Post routes
router.get("/users/:id", userController.getUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
