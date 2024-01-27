const express = require("express");
const router = express.Router();
const {
  createAidRequest,
  updateAidRequest,
  updateAidFund,
  closeAidRequest,
  deleteAidRequest,
  getDoneeAidRequest,
  getDonorAidRequest,
  getAllAidRequest,
  getAidRequestDetail, 
} = require("../Controller/aidRequest");

// Define routes for creating, updating, and managing aid requests
router.post("/create", createAidRequest); // Create a new aid request
router.post("/update", updateAidRequest); // Update an existing aid request
router.post("/update-fund", updateAidFund); // Update aid fund and it's status
router.put("/close", closeAidRequest); // Manually close an aid request
router.delete("/delete", deleteAidRequest); // Delete an aid request
router.get("/donee-list/:accountNo", getDoneeAidRequest); // Get aid requests for a donee
router.post("/donor-list", getDonorAidRequest); // Get donor-related aid requests (to be checked)
router.get("/all", getAllAidRequest); // Get all aid requests
router.get("/get-aid-detail",getAidRequestDetail );
module.exports = router;
