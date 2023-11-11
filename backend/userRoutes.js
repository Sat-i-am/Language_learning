const { register, login, displayEnglish_questions } = require("./userController");
const router = require("express").Router();

router.post("/register",register)
router.post("/login", login)
router.post("/displayEnglish_questions", displayEnglish_questions)

module.exports = router;