const userCtrl = require("../controllers/user");
const express = require("express");
const router = express.Router();
const passwordValidator = require("../middlewares/password");

router.post("/signup", passwordValidator, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
