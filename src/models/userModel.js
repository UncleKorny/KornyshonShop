const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, validate: {
      validator: function(value) {
        return !/\s/.test(value);
      },
      message: "Имя не может содержать пробелы"
    } },
    email: {type: String, required: true, unique: true, validate: {
      validator: function(value) {
        return !/\s/.test(value);
      },
      message: "Имя не может содержать пробелы"
    }},
    password: {type: String, required: true},
    discount: {type: Number},
    profileImage: {type: String},
    isAdmin: {type: Boolean, required: true, default: false},
    isModer: {type: Boolean, required: true, default: false},
  },{timestamps:true});

const User = mongoose.model('User', userSchema);

module.exports = User;