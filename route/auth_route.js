const { signUp } = require("../controller/auth_controller");

const router = require("express").Router();

router.route("/sign-up").post(signUp);

module.exports = router;
