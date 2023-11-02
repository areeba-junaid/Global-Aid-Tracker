const AidOffer = require("../Model/aidOfferDb");
const Id = require("nodejs-unique-numeric-id-generator");

const createAidOffer = async (req, res) => {
  try {
    const { aidType, aidName, aidInfo, elligibility, amount, donorId, limit } =
      req.body;
    console.log(req.body);
    if (
      !aidType ||
      !aidName ||
      !aidInfo ||
      !elligibility ||
      !amount ||
      !donorId ||
      !limit
    ) {
      return res
        .status(400)
        .json({ error: "Required fields are missing or incorrect" });
    }
    const newAidOffer = new AidOffer({
      tId: Id.generate(new Date().toJSON()),
      aidType,
      aidName,
      aidInfo,
      elligibility,
      amount,
      status: "open",
      donor: donorId,
      limit,
    });
    const savedAidOffer = await newAidOffer.save();
    res.status(201).json(savedAidOffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const DoneeRequested = async (req, res) => {
  try {
    const { tId, doneeId, proposal } = req.body;
    if (!tId || !doneeId || !proposal) {
      return res
        .status(400)
        .json({ error: "Required fields are missing or incorrect" });
    }
    const updatedAidOffer = await AidOffer.findOneAndUpdate(
      { tId },
      {
        $push: {
          requestedBy: { donee: doneeId, proposal: proposal },
        },
      },
      { new: true }
    );
    if (!updatedAidOffer) {
      return res.status(404).json({ error: "AidOffer not found" });
    }
    res.status(200).json(updatedAidOffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const DoneeAccepted = async (req, res) => {
  try {
    const { tId, doneeId, proposal } = req.body;
    if (!tId || !doneeId || !proposal) {
      return res
        .status(400)
        .json({ error: "Required fields are missing or incorrect" });
    }
    let updatedAidOffer = await AidOffer.findOneAndUpdate(
      { tId },
      {
        $pull: { "requestedBy": { donee: doneeId } }, // Use $pull on the requestedBy array
        $push: { "acceptedDonee": { donee: doneeId, proposal: proposal } }, // Use $push on the acceptedDonee array
      },
      { new: true }
    );
    if (!updatedAidOffer) {
      return res.status(404).json({ error: "AidOffer not found" });
    }
    if (updatedAidOffer.acceptedDonee.length === updatedAidOffer.limit) {
      updatedAidOffer.status = "closed";
      updatedAidOffer = await updatedAidOffer.save();
    }
    res.status(200).json(updatedAidOffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateAidOffer = async (req, res) => {
  const { aidType, aidName, aidInfo, elligibility, amount, limit, donorId } =
    req.body;
  try {
    if (
      !aidType ||
      !aidName ||
      !aidInfo ||
      !elligibility ||
      !amount ||
      !limit
    ) {
      return res
        .status(400)
        .json({ error: "Required fields are missing or incorrect" });
    }
    const aidOffer = await AidOffer.findOne({ tId });

    if (!aidOffer) {
      return res.status(404).json({ error: "AidOffer not found" });
    }
    c;
    if (aidOffer.acceptedDonee.length > 0) {
      return res.status(403).json({ error: "Funded Offers Can't be updated" });
    }
    aidOffer.aidName = aidName;
    aidOffer.aidInfo = aidInfo;
    aidOffer.elligibility = elligibility;
    aidOffer.amount = amount;
    aidOffer.limit = limit;
    const updatedAidOffer = await aidOffer.save();

    res.status(200).json(updatedAidOffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const changeStatus = async (req, res) => {
  try {
    const { tId, donorId, status } = req.body;

    if (!tId || !donorId || !status) {
      return res
        .status(400)
        .json({ error: "Required fields are missing or incorrect" });
    }
    const aidOffer = await AidOffer.findOne({ tId });

    if (!aidOffer) {
      return res.status(404).json({ error: "AidOffer not found" });
    }

    if (aidOffer.donor != donorId) {
      return res.status(403).json({ error: "Unauthorized User" });
    }
    aidOffer.status = status;
    const updatedAidOffer = await aidOffer.save();
    res.status(200).json(updatedAidOffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteAidOffer = async (req, res) => {
  try {
    const { tId, donorId } = req.body;
    if (!tId || !donorId) {
      return res
        .status(400)
        .json({ error: "Required fields are missing or incorrect" });
    }
    const aidOffer = await AidOffer.findOne({ tId });
    if (!aidOffer) {
      return res.status(404).json({ error: "AidOffer not found" });
    }
    if (aidOffer.donor.toString() !== donorId) {
      return res.status(403).json({ error: "Unauthorized User" });
    }
    if (aidOffer.acceptedDonee.length > 0) {
      return res.status(403).json({ error: "Funded Offers Can't be deleted" });
    }
    await AidOffer.deleteOne({ tId });

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const doneeAcceptedOffersList = async (req, res) => {
  try {
    const { doneeId } = req.body;

    if (!doneeId) {
      return res.status(400).json({ error: "Donee ID is missing" });
    }
    const acceptedAidOffers = await AidOffer.find({
      "acceptedDonee.donee": doneeId,
    }).populate("donor");
    if (acceptedAidOffers.length === 0) {
      return res
        .status(404)
        .json({ error: "No accepted offers found for this donee" });
    }
    res.status(200).json(acceptedAidOffers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const doneeRequestedOffersList = async (req, res) => {
  try {
    const { doneeId } = req.body;
    if (!doneeId) {
      return res.status(400).json({ error: "Donee ID is missing" });
    }
    const requestedAidOffers = await AidOffer.find({
      "requestedBy.donee": doneeId,
    }).populate("donor");
    if (requestedAidOffers.length === 0) {
      return res
        .status(404)
        .json({ error: "No requested offers found for this donee" });
    }
    res.status(200).json(requestedAidOffers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getDonorAidOffersList = async (req, res) => {
  try {
    const { donorId } = req.body;

    if (!donorId) {
      return res.status(400).json({ error: "Donor ID is missing" });
    }
    const donorAidOffers = await AidOffer.find({ donor: donorId }).populate({
      path: "requestedBy.donee acceptedDonee.donee",
      model: "Account",
    });

    if (donorAidOffers.length === 0) {
      return res
        .status(404)
        .json({ error: "No aid offers found for this donor" });
    }

    res.status(200).json(donorAidOffers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllAidOffer = async (req, res) => {
  try {
    const aidOffers = await AidOffer.find().populate({
      path: "donor requestedBy.donee acceptedDonee.donee",
    });

    if (aidOffers.length === 0) {
      return res.status(404).json({ error: "No aid offers found" });
    }

    res.status(200).json(aidOffers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
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
};
