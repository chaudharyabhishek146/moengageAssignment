const mongoose = require("mongoose");

const httpCodeSchema = new mongoose.Schema({
  code: {
    type: Number,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
});


const HttpCode = mongoose.model('HttpCode',httpCodeSchema)
module.exports= HttpCode