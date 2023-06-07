const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    count: { type: Number, default: 0 },
  });
  
  const Visit = mongoose.model('Visit', visitSchema);
  
  module.exports = Visit;