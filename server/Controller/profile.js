//Imports
const mongoose = require("mongoose");
const ID = require("nodejs-unique-numeric-id-generator");
const crypto = require("crypto"); // Import the crypto module
const profileSchema = require("../Model/profileDb");

// Create a new profile
const createProfile = async (req, res) => {
  try {
    const { account, name, email, country, phone, userType } = req.body;
    // Hash the Metamask account address
    if (!account) {
      // Check if 'account' is missing or empty in the request
      return res
        .status(400)
        .json({ error: "Missing or empty 'account' field" });
    }
    const hashedAccount = crypto
      .createHash("sha256")
      .update(account)
      .digest("hex");

    const newProfile = new profileSchema({
      account: hashedAccount, // Store the hashed account address
      id: ID.generate(new Date().toJSON()),
      name,
      email,
      country,
      phone,
      userType,
    });
    const savedProfile = await newProfile.save();

    res.status(201).json(savedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { account, name, email, country, phone } = req.body;

    // Check if 'account' is missing in the request
    if (!account) {
      return res
        .status(400)
        .json({ error: "Missing 'account' field in the request body" });
    }

    const hashedAccount = crypto
      .createHash("sha256")
      .update(account)
      .digest("hex");

    // Find the profile by 'account' and update it
    const updatedProfile = await profileSchema.findOneAndUpdate(
      { account: hashedAccount }, // The filter to find the document to update
      {
        $set: {
          name,
          email,
          country,
          phone,
        },
      },
      { new: true }
    );
    if (!updatedProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    const savedProfile = await updatedProfile.save();
    const response = updatedProfile.toObject();
    response.account = account;
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const { account } = req.body;

    // Check if 'account' is missing in the request
    if (!account) {
      return res
        .status(400)
        .json({ error: "Missing 'account' field in the request body" });
    }

    const hashedAccount = crypto
      .createHash("sha256")
      .update(account)
      .digest("hex");
    console.log(account, hashedAccount);

    const foundProfile = await profileSchema.findOne({
      account: hashedAccount,
    });
    if (!foundProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    const response = foundProfile.toObject();
    response.account = account;
    // Include the 'account' from the request in the response JSON
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createProfile, updateProfile, getProfile };
