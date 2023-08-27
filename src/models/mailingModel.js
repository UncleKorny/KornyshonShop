const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    subscribed: {
      type: Boolean,
      default: true,
    },
  });
  
  const Mailing = mongoose.model('mailing', emailSchema);
  
  module.exports = Mailing;