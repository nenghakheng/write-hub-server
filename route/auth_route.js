const { signUp, login } = require("../controller/auth_controller");

const router = require("express").Router();

router.route("/sign-up").post(signUp);

router.route("/login").post(login);

module.exports = router;
