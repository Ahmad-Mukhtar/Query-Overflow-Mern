const answerController = require("../controllers/answerController");
const authenticateToken = require("../middlewares/authMiddleware");

const express = require("express");

const router = express.Router();

router.get("/get-answers", authenticateToken, answerController.getAnswer);
router.get(
  "/get-answer/:answerId",
  authenticateToken,
  answerController.getAnswerById
);
router.get(
  "/get-user-answers",
  authenticateToken,
  answerController.getAllAnswerOfSpecificUser
);

router.delete(
  "/delete-answer/:answerId",
  authenticateToken,
  answerController.deleteAnswerById
);

router.post("/create-answer", authenticateToken, answerController.addAnswer);

router.post("/edit-answer", authenticateToken, answerController.editAnswer);

router.post(
  "/update-up-vote",
  authenticateToken,
  answerController.updateUpVote
);

router.post(
  "/update-down-vote",
  authenticateToken,
  answerController.updateDownVote
);

router.post(
  "/update-answer-usefull",
  authenticateToken,
  answerController.updateAnswerUsefullness
);

module.exports = router;
