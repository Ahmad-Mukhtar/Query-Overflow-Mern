const Question = require("../models/questionModal");
const Answer = require("../models/answerModel");
const Bookmark = require("../models/bookmarkAnswerModel");

exports.getAnswer = async (req, res) => {
  try {
    const allAnswer = await Answer.find({}).populate([
      { path: "userId", select: ["name"] },
    ]);
    const answerCount = await Answer.countDocuments({}).exec();
    return res.status(201).json({ data: allAnswer, totalAnswer: answerCount });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "unexpected server error" });
  }
};

exports.getAnswerById = async (req, res) => {
  try {
    const { answerId } = req.params;

    if (!answerId) {
      return res.status(400).json({ error: "missing input" });
    }

    const answerDetail = await Answer.findById({ _id: answerId });

    if (!answerDetail) {
      return res.status(404).json({ error: "data not found" });
    }

    return res.status(201).json({ data: answerDetail });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "unexpected server error" });
  }
};

exports.getAllAnswerOfSpecificUser = async (req, res) => {
  try {
    const { userId } = req.user;

    if (!userId) {
      return res.status(400).json({ error: "missing input" });
    }

    const userAnswer = await Answer.find({ userId });

    const answerCount = await Answer.countDocuments({}).exec();

    return res.status(201).json({ data: userAnswer, totalAnswer: answerCount });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "unexpected error occurred" });
  }
};

exports.deleteAnswerById = async (req, res) => {
  try {
    const { answerId } = req.params;

    const { userId } = req.user;

    if (!userId || !answerId) {
      return res.status(400).json({ error: "missing details" });
    }

    await Answer.findOneAndDelete({
      _id: answerId,
      userId: userId,
    });

    const isAnswerBookmarked = await Bookmark.findOne({ answerId: answerId });

    if (isAnswerBookmarked) {
      await Bookmark.deleteOne({ answerId: answerId });
    }

    return res.status(201).json({ data: "answer deleted succesfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "unexpected server occurred" });
  }
};

exports.addAnswer = async (req, res) => {
  try {
    const { userId } = req.user;
    const { description, questionId } = req.body;

    if ((!userId || !description, !questionId)) {
      return res.status(400).json({ error: "missing inputs" });
    }

    const newAnswer = new Answer({
      description: description,
      userId: userId,
      questionId: questionId,
    });

    const saveAnswer = await newAnswer.save();

    if (saveAnswer) {
      const updateAnswerCount = await Question.updateOne(
        { _id: questionId },
        { $inc: { totalAnswers: 1 } }
      );

      return res.status(201).json({ data: saveAnswer });
    }
    return res.status(422).json({ error: "unable to add answer" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "unexpected server error" });
  }
};

exports.editAnswer = async (req, res) => {
  try {
    const { userId } = req.user;
    const { description, answerId } = req.body;

    if (!userId || !description || !answerId) {
      return res.status(400).json({ error: "missing inputs" });
    }

    const isanswerUpdated = await Answer.updateOne(
      { _id: answerId, userId: userId },
      { description: description }
    );

    return res.status(201).json({ data: "answer updated!" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "unexpected server error" });
  }
};

exports.updateUpVote = async (req, res) => {
  try {
    const { userId } = req.user;
    const { answerId } = req.body;

    if (!userId || !answerId) {
      return res.status(400).json({ error: "missing inputs" });
    }

    const getUpVotes = await Answer.findById({ _id: answerId });

    const isUserInDownVotes = getUpVotes.downVotes.includes(userId);

    if (isUserInDownVotes) {
      await Answer.updateOne(
        { _id: answerId },
        { $pull: { downVotes: userId } }
      );
      await Answer.updateOne({ _id: answerId }, { $inc: { votes: 1 } });
      return res.status(201).json({ data: "voted" });
    }

    const isUserInUpvotes = getUpVotes.upVotes.includes(userId);

    if (!isUserInUpvotes) {
      await Answer.updateOne({ _id: answerId }, { $push: { upVotes: userId } });
      await Answer.updateOne({ _id: answerId }, { $inc: { votes: 1 } });
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
    const { answerId } = req.body;

    if (!userId || !answerId) {
      return res.status(400).json({ error: "missing inputs" });
    }

    const getUpVotes = await Answer.findById({ _id: answerId });

    const isUserInUpvotes = getUpVotes.upVotes.includes(userId);

    if (isUserInUpvotes) {
      await Answer.updateOne({ _id: answerId }, { $pull: { upVotes: userId } });
      await Answer.updateOne({ _id: answerId }, { $inc: { votes: -1 } });
      return res.status(201).json({ data: "voted" });
    }

    const isUserInDownVotes = getUpVotes.downVotes.includes(userId);

    if (!isUserInDownVotes) {
      await Answer.updateOne(
        { _id: answerId },
        { $push: { downVotes: userId } }
      );
      await Answer.updateOne({ _id: answerId }, { $inc: { votes: -1 } });
      return res.status(201).json({ data: "voted" });
    }

    return res.status(409).json({ error: "already voted" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "unexpected server error" });
  }
};

exports.updateAnswerUsefullness = async (req, res) => {
  try {
    const { userId } = req.user;
    const { answerId, isAnswerUsefull } = req.body;

    if (!userId || !answerId) {
      return res.status(400).json({ error: "missing inputs" });
    }

    await Answer.updateOne(
      { _id: answerId, userId: userId },
      { $set: { isUsefull: !isAnswerUsefull } }
    );

    return res.status(201).json({ data: "answer marker updated" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "unexpected server error" });
  }
};
