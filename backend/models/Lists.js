const mongoose = require("mongoose")

const listSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    codes: {
      type: [Number],
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const List = mongoose.model("List", listSchema)

module.exports = List

