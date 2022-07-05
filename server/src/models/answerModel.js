const mongoose = require("mongoose");

const answerSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: [true, "missing owner id"],
      ref: "user",
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      require: [true, "missing question id"],
      ref: "question",
    },
    description: {
      type: String,
      require: [true, "enter answer description"],
    },
    votes: {
      type: Number,
      default: 0,
    },
    upVotes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    },
    downVotes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    },
    isUsefull: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("answer", answerSchema);
