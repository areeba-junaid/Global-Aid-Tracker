const express = require("express");
const router = express.Router();
const {
  createAidOffer,
  DoneeRequested,
  DoneeAccepted,
  updateAidOffer,
  changeStatus,
  deleteAidOffer,
  doneeAcceptedOffersList,
  doneeRequestedOffersList,
  getDonorAidOffersList,
  getAllAidOffer,
} = require("../Controller/aidOffer");

router.post("/create", createAidOffer);
router.post("/donee-request", DoneeRequested);
router.post("/donor-accept", DoneeAccepted);
router.post("/update", updateAidOffer);//later
router.put("/change-status", changeStatus);//later
router.delete("/delete", deleteAidOffer);//later
router.get("/donee-accepted-offer-list/:donee", doneeAcceptedOffersList,);
router.get("/donee-requested-offer-list/:donee", doneeRequestedOffersList,);
router.get("/donor-offer-list/:donor", getDonorAidOffersList);
router.get("/all", getAllAidOffer);
module.exports = router;
