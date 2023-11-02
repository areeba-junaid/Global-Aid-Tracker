const mongoose = require("mongoose");

const aidRequestSchema = new mongoose.Schema({
  tId: {
    type: Number,
    required: true,
    unique: true,
  },
  aidType: {
    type: String,
    enum: ["educational", "emergency", "food", "medical", "technology"],
    required: true,
  },
  aidName: {
    type: String,
    required: true,
  },
  aidInfo: {
    type: String,
    required: true,
  },
  targetAmount: {
    type: Number,
    required: true,
  },
  collectedAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ["closed", "open"],
    required: true,
  },
  donee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account", // Reference the "Account" model
    required: true,
  },
});

module.exports = mongoose.model("AidRequest", aidRequestSchema);
