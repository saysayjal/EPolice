const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  description: { type: String, required: true },
  reported_by: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "User",
  },
  status: { type: String, enum: ['Pending', 'Approved','Handled','Rejected'], default: 'Pending' },
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
