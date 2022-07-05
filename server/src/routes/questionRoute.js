const questionController = require("../controllers/questionController");
const authenticateToken = require("../middlewares/authMiddleware");

const express = require("express");

const router = express.Router();

router.get(
  "/get-questions",
  authenticateToken,
  questionController.getQuestions
);
router.get(
  "/get-question/:questionId",
  authenticateToken,
  questionController.getQuestionById
);
router.get(
  "/get-user-questions",
  authenticateToken,
  questionController.getAllQuestionsOfSpecificUser
);

router.delete(
  "/delete-question/:questionId",
  authenticateToken,
  questionController.deleteQuestionById
);

router.post(
  "/create-question",
  authenticateToken,
  questionController.addQuestion
);
router.post(
  "/edit-question",
  authenticateToken,
  questionController.editQuestion
);

router.post(
  "/update-up-vote",
  authenticateToken,
  questionController.updateUpVote
);

router.post(
  "/update-down-vote",
  authenticateToken,
  questionController.updateDownVote
);

module.exports = router;
