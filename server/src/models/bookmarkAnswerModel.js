const mongoose = require("mongoose");

const bookmarkAnswerSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: [true, "missing owner id"],
      ref: "user",
    },
    answerId: {
      type: mongoose.Schema.Types.ObjectId,
      require: [true, "missing answer id"],
      ref: "answer",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("bookmark", bookmarkAnswerSchema);
