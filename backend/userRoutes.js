const { register, login, showquestions, chooseLang, submitAnswer, setDifficulty } = require("./userController");
const router = require("express").Router();

router.post("/register",register)
router.post("/login", login)
router.post("/chooseLang", chooseLang)
router.post("/submitAnswer", submitAnswer)
router.post("/difficulty", setDifficulty);
router.post("/questions", showquestions);
module.exports = router;