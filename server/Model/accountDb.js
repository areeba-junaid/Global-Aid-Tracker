const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  accountNo: {
    //metamask account Number
    type: String,
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
    unique: true,
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
    type: String,
    enum: ["donee", "donor"],
    required: true,
  },
});

module.exports = mongoose.model("Account", accountSchema);
