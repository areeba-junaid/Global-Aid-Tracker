//Imports
const mongoose = require("mongoose");
const accountSchema = require("../Model/accountDb");

// Create a new account
const createAccount = async (req, res) => {
  try {
    const { accountNo, name, email, country, phone, userType } = req.body;
    if (!accountNo || !name || !email || !country || !phone || !userType) {
      return res.status(401).json({ error: "Required fields are missing" });
      
    }
    userAccount = await accountSchema.find({
      $or: [{ accountNo }, { email }, {phone}],
    });
    if (userAccount.length != 0) {
      return res.status(401).json({ error: "User Aready Registered with your given data" });
      
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
    console.log("Hello");
    userAccount = await accountSchema.find({
      $or: [ { email }, {phone}],
      $and:[{ accountNo: { $ne: accountNo } }]
    });
    if (userAccount.length != 0) {
      return res.status(401).json({ error: "User Aready Registered with your given data" });
      
    }
    const updatedAccount = await accountSchema.findOneAndUpdate(
      { accountNo }, 
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
    
    const  accountNo  = req.query.accountNo;
    console.log(accountNo);
    const foundAccount = await accountSchema.findOne({
      accountNo,
    });
    if (!foundAccount) {
      return res.json({ error: "Account not found" });
    }
    res.json(foundAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createAccount, updateAccount, getAccount };
