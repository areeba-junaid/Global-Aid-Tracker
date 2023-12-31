const mongoose = require("mongoose");

const assetOfferSchema = new mongoose.Schema({
  tId: {
    type: Number,
    required: true,
    unique: true,
  },
  aidType: {
    type: String,
    enum: ["education", "emergency", "food", "health", "technology", "other"],
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
  status: {
    type: String,
    enum: ["closed", "open"],
    required: true,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account", // Reference the "account" model
    required: true,
  },

  createdAt:{
    type: String,
    default :Date,
    required :true,
  }
});

module.exports = mongoose.model("AssetOffer", assetOfferSchema);
