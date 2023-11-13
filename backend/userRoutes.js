const { register, login, displayEnglish_questions, chooseLang, submitAnswer, setDifficulty } = require("./userController");
const router = require("express").Router();

router.post("/register",register)
router.post("/login", login)
router.post("/displayEnglish_questions", displayEnglish_questions)
router.post("/chooseLang", chooseLang)
router.post("/submitAnswer", submitAnswer)
router.post("/difficulty", setDifficulty);
module.exports = router;