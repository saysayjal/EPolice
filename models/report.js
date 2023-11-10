const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  description: { type: String, required: true },
  handled: { type: Boolean, required: true, default: false },
  verified: { type: Boolean, required: true, default: false }, 
  
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
