const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: [true, "missing owner id"],
      ref: "user",
    },
    title: {
      type: String,
      require: [true, "Enter question title"],
    },
    description: {
      type: String,
      require: [true, "enter question description"],
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
    totalAnswers: {
      type: Number,
      default: 0,
    },
    tags: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("question", questionSchema);
