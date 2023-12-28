const express = require("express");
const router = express.Router();
const {
  createAuthToken,
  decodeAuthToken,
} = require("../Controller/authToken");

router.post("/create", createAuthToken);
router.get("/decode",decodeAuthToken,);

module.exports = router;

