const { signUp, login } = require("../controllers/auth_controller");

const router = require("express").Router();

router.route("/sign-up").post(signUp);

router.route("/login").post(login);

module.exports = router;
