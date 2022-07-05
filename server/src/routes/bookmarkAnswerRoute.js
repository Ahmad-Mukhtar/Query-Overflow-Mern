const bookmarkController = require("../controllers/bookmarkAnswerController");
const authenticateToken = require("../middlewares/authMiddleware");

const express = require("express");

const router = express.Router();

router.get(
  "/get-bookmark-answers",
  authenticateToken,
  bookmarkController.getBookmarkAnswers
);
router.get(
  "/get-bookmark-answer/:bookmarkAnswerId",
  authenticateToken,
  bookmarkController.getBookmarkAnswerById
);
router.post(
  "/remove-bookmark-answer",
  authenticateToken,
  bookmarkController.deleteBookmarkAnswer
);

router.post(
  "/bookmark-answer",
  authenticateToken,
  bookmarkController.bookmarkAnswer
);

module.exports = router;
