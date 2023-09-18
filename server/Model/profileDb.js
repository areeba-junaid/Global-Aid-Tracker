const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  account: {
    //metamask account Number
    type: String,
    required: true,
    unique: true,
  },
  id: {
    //unique number generated
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  userType: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
