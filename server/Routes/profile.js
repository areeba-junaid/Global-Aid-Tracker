const express = require("express");
const router = express.Router();
const {
  createProfile,
  updateProfile,
  getProfile,
} = require("../Controller/profile");

router.post("/create", createProfile);
router.post("/update", updateProfile);
router.get("/get", getProfile);

module.exports = router;
