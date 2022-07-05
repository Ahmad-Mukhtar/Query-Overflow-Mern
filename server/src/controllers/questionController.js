const Answer = require("../models/answerModel");
const Question = require("../models/questionModal");
const BookMark = require("../models/bookmarkAnswerModel");
const apiFeatures = require("../utils/apiFeatures");

exports.getQuestions = async (req, res) => {
  try {
    const allQuestion = await new apiFeatures(
      Question.find({}).populate([
        { path: "userId", select: ["firstName", "lastName"] },
      ]),
      req.query
    )
      .sort()
      .pagination().query;

    const questionCount = await Question.countDocuments({}).exec();
    return res
      .status(201)
      .json({ data: allQuestion, totalQuestions: questionCount });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "unexpected server error" });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const { userId } = req.user;
    const { questionId } = req.params;

    if (!questionId || !userId) {
      return res.status(400).json({ error: "missing input" });
    }

    const questionDetail = await Question.findById({
      _id: questionId,
    }).populate([{ path: "userId", select: ["firstName", "lastName"] }]);

    const answersOfQuestion = await Answer.find({ questionId: questionId });

    const bookmarkAnswers = await BookMark.find({ userId: userId });

    return res.status(201).json({
      data: {
        questionDetail: questionDetail,
        answersOfQuestion: answersOfQuestion,
        bookmarkAnswers: bookmarkAnswers,
      },
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "unexpected server error" });
  }
};

exports.getAllQuestionsOfSpecificUser = async (req, res) => {
  try {
    const { userId } = req.user;

    if (!userId) {
      return res.status(400).json({ error: "missing input" });
    }

    const userQuestions = await Question.find({ userId });

    const questionCount = await Question.countDocuments({}).exec();

    return res
      .status(201)
      .json({ data: userQuestions, totalQuestions: questionCount });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "unexpected error occurred" });
  }
};

exports.deleteQuestionById = async (req, res) => {
  try {
    const { questionId } = req.params;

    const { userId } = req.user;

    if (!userId || !questionId) {
      return res.status(400).json({ error: "missing details" });
    }

    await Question.findOneAndDelete({
      _id: questionId,
      userId: userId,
    });

    const answersOfQuestion = await Answer.find({ questionId: questionId });

    if (answersOfQuestion.length !== 0) {
      await Answer.deleteMany({ questionId: questionId });
    }

    console.log(answersOfQuestion);

    for (let i = 0; i < answersOfQuestion.length; i++) {
      await BookMark.deleteMany({ answerId: answersOfQuestion[i]._id });
    }

    return res.status(201).json({ data: "question deleted succesfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "unexpected server occurred" });
  }
};

exports.addQuestion = async (req, res) => {
  try {
    const { userId } = req.user;
    const { title, description } = req.body;

    if (!userId || !title || !description) {
      return res.status(400).json({ error: "missing details" });
    }

    const newQuestion = new Question({
      title: title,
      description: description,
      userId: userId,
    });

    const saveQuestion = await newQuestion.save();

    if (saveQuestion) {
      return res.status(201).json({ data: saveQuestion });
    }
    return res.status(422).json({ error: "unable to add question" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "unexpected server error" });
  }
};

exports.editQuestion = async (req, res) => {
  try {
    const { userId } = req.user;
    const { title, description, questionId } = req.body;
    console.log(req.body);
    if (!userId || !title || !description || !questionId) {
      return res.status(400).json({ error: "missing inputs" });
    }

    const isQuestionUpdated = await Question.updateOne(
      { _id: questionId, userId: userId },
      { title: title, description: description }
    );

    return res.status(201).json({ data: "question updated!" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "unexpected server error" });
  }
};

exports.updateUpVote = async (req, res) => {
  try {
    const { userId } = req.user;
    const { questionId } = req.body;

    if (!userId || !questionId) {
      return res.status(400).json({ error: "missing inputs" });
    }

    const getUpVotes = await Question.findById({ _id: questionId });

    const isUserInDownVotes = getUpVotes.downVotes.includes(userId);

    if (isUserInDownVotes) {
      await Question.updateOne(
        { _id: questionId },
        { $pull: { downVotes: userId } }
      );
      await Question.updateOne({ _id: questionId }, { $inc: { votes: 1 } });
      return res.status(201).json({ data: "voted" });
    }

    const isUserInUpvotes = getUpVotes.upVotes.includes(userId);

    if (!isUserInUpvotes) {
      await Question.updateOne(
        { _id: questionId },
        { $push: { upVotes: userId } }
      );
      await Question.updateOne({ _id: questionId }, { $inc: { votes: 1 } });
      return res.status(201).json({ data: "voted" });
    }

    return res.status(409).json({ error: "already voted" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "unexpected server error" });
  }
};

exports.updateDownVote = async (req, res) => {
  try {
    const { userId } = req.user;
    const { questionId } = req.body;

    if (!userId || !questionId) {
      return res.status(400).json({ error: "missing inputs" });
    }

    const getUpVotes = await Question.findById({ _id: questionId });

    const isUserInUpvotes = getUpVotes.upVotes.includes(userId);

    if (isUserInUpvotes) {
      await Question.updateOne(
        { _id: questionId },
        { $pull: { upVotes: userId } }
      );
      await Question.updateOne({ _id: questionId }, { $inc: { votes: -1 } });
      return res.status(201).json({ data: "voted" });
    }

    const isUserInDownVotes = getUpVotes.downVotes.includes(userId);

    if (!isUserInDownVotes) {
      await Question.updateOne(
        { _id: questionId },
        { $push: { downVotes: userId } }
      );
      await Question.updateOne({ _id: questionId }, { $inc: { votes: -1 } });
      return res.status(201).json({ data: "voted" });
    }

    return res.status(409).json({ error: "already voted" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "unexpected server error" });
  }
};
