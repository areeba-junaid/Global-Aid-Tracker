const express = require("express");
const router = express.Router();
const {
  createAccount,
  updateAccount,
  getAccount,
} = require("../Controller/account");

router.post("/create", createAccount);
router.post("/update", updateAccount);
router.get("/get", getAccount);

module.exports = router;
