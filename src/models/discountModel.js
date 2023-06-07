const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
    name: {type:String, required: true},
    count: {type: Number, required: true},
    amount: {type: Number, required: true},
    type: {type: String, required: true}
  },{timestamps:true});

const Discount = mongoose.model('Discount', discountSchema);

module.exports = Discount;