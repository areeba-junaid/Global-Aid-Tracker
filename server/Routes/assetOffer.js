const express = require("express");
const router = express.Router();
const {
    createAssetOffer,
    updateAssetOffer,
    closeAssetOffer,
    deleteAssetOffer,
    getUserAssetOffer,
    getAllDoneeAssetOffer,
    getAllDonorAssetOffer,
    getAssetDetail,
} = require("../Controller/assetOffer");

// Define routes for creating, updating, and managing asset requests
router.post("/create", createAssetOffer); // Create a new asset  request
router.post("/update", updateAssetOffer); // Update an existing asset  request
router.put("/close", closeAssetOffer); // Manually close an asset  request
router.delete("/delete", deleteAssetOffer); // Delete an asset  request
router.get("/user-list/:accountNo",  getUserAssetOffer); // Get  asset  for a donee or donor
router.get("/all-donee-asset-list",  getAllDoneeAssetOffer); // Get all donee asset offer
router.get("/all-donor-asset-list",getAllDonorAssetOffer);
router.get("/asset-offer-detail",getAssetDetail,); 
module.exports = router;
