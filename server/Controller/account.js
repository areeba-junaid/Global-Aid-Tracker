//Imports
const mongoose = require("mongoose");
const accountSchema = require("../Model/accountDb");

// Create a new account
const createAccount = async (req, res) => {
  try {
    const { accountNo, name, email, country, phone, userType } = req.body;
    if (!accountNo || !name || !email || !country || !phone || !userType) {
      res.status(401).json({ error: "Required fields are missing" });
      return;
    }
    userAccount = await accountSchema.find({
      $or: [{ accountNo }, { email }],
    });
    if (userAccount.length != 0) {
      res.status(401).json({ error: "Account or email already Registered" });
      return;
    }
    const newAccount = new accountSchema({
      accountNo: accountNo,
      name,
      email,
      country,
      phone,
      userType,
    });
    const savedAccount = await newAccount.save();

    res.status(201).json(savedAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateAccount = async (req, res) => {
  try {
    const { accountNo, name, email, country, phone } = req.body;
    // Find the account by 'account' and update it
    const updatedAccount = await accountSchema.findOneAndUpdate(
      { accountNo }, // The filter to find the document to update
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
    if (!updatedAccount) {
      return res.status(404).json({ error: "Account not found" });
    }
    const savedAccount = await updatedAccount.save();

    res.json(savedAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAccount = async (req, res) => {
  try {
    const { accountNo } = req.body;

    const foundAccount = await accountSchema.findOne({
      accountNo,
    });
    if (!foundAccount) {
      return res.status(404).json({ error: "Account not found" });
      console.log(foundAccount);
    }
    res.json(foundAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createAccount, updateAccount, getAccount };
