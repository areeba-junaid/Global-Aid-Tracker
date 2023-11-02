const mongoose = require("mongoose");

const aidOfferSchema = new mongoose.Schema({
  tId: {
    type: String,
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
  elligibility: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ["closed", "open"],
    required: true,
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  limit: {
    type: Number,
    max: 20, // Smaller than 20
    required: true,
  },
  requestedBy: [
    {
      donee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
      },
      proposal: {
        type: String,
      },
    },
  ],
  acceptedDonee: [
    {
      donee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
      },
      proposal: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("AidOffer", aidOfferSchema);
