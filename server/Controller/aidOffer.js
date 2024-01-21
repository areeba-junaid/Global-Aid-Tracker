const AidOffer = require("../Model/aidOfferDb");
const accountSchema = require("../Model/accountDb");
const Id = require("nodejs-unique-numeric-id-generator");
const moment = require("moment");

const createAidOffer = async (req, res) => {
  try {
    const { aidType, aidName, aidInfo, amount, account, limit } = req.body;
    console.log(req.body);
    if (!aidType || !aidName || !aidInfo || !amount || !account || !limit) {
      return res
        .status(400)
        .json({ error: "Required fields are missing or incorrect" });
    }
    const userAccount = await accountSchema.findOne({ accountNo: account });
    if (!userAccount) {
      res.status(401).json({ error: "Account not registered " });
      return;
    }
    const date = Date.now();
    const createdAt = moment(date).format("DD MMM YYYY HH:mm:ss");
    const newAidOffer = new AidOffer({
      tId: Id.generate(new Date().toJSON()),
      aidType,
      aidName,
      aidInfo,
      amount,
      status: "open",
      donor: userAccount._id,
      limit,
      createdAt,
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
    const { tId, donee, proposal } = req.body;
    if (!tId || !donee || !proposal) {
      return res
        .status(400)
        .json({ error: "Required fields are missing or incorrect" });
    }
    const userAccount = await accountSchema.findOne({ accountNo: donee });
    if (!userAccount) {
      res.status(401).json({ error: "Account not registered " });
      return;
    }
    const updatedAidOffer = await AidOffer.findOneAndUpdate(
      { tId },
      {
        $push: {
          requestedBy: { donee: userAccount._id, proposal: proposal },
        },
      },
      { new: true }
    ).populate( {path: "donor requestedBy.donee acceptedDonee.donee"});
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
    console.log("Donor Accepting",req.body);
    const { tId, donee, proposal } = req.body;
    if (!tId || !donee || !proposal) {
      return res
        .status(400)
        .json({ error: "Required fields are missing or incorrect" });
    }
    const userAccount = await accountSchema.findOne({ accountNo: donee });
    console.log(userAccount);
    if (!userAccount) {
      res.status(401).json({ error: "Account not registered " });
      return;
    }
    let updatedAidOffer = await AidOffer.findOneAndUpdate(
      { tId },
      {
        $pull: { requestedBy: { donee: userAccount._id } }, // Use $pull on the requestedBy array
        $push: { acceptedDonee: { donee: userAccount._id, proposal } }, // Use $push on the acceptedDonee array
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
  const { aidType, aidName, aidInfo, amount, limit, donor } =
    req.body;
  try {
    if (!aidType || !aidName || !aidInfo || !amount || !limit || !donor) {
      return res
        .status(400)
        .json({ error: "Required fields are missing or incorrect" });
    }
    const aidOffer = await AidOffer.findOne({ tId });

    if (!aidOffer) {
      return res.status(404).json({ error: "AidOffer not found" });
    }
    if (aidOffer.acceptedDonee.length > 0) {
      return res.status(403).json({ error: "Funded Offers Can't be updated" });
    }
    aidOffer.aidName = aidName;
    aidOffer.aidInfo = aidInfo;
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
    const { donee} = req.params;

    if (!donee) {
      return res.status(400).json({ error: "Donee ID is missing" });
    }
    const userAccount = await accountSchema.findOne({ accountNo: donee });
    if (!userAccount) {
      res.status(401).json({ error: "Account not registered " });
      return;
    }
    const acceptedAidOffers = await AidOffer.find({
      "acceptedDonee.donee": userAccount._id,
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
    const { donee } = req.params;
    if (!donee) {
      return res.status(400).json({ error: "Donee ID is missing" });
    }
    const userAccount = await accountSchema.findOne({ accountNo: donee });
    if (!userAccount) {
      res.status(401).json({ error: "Account not registered " });
      return;
    }
    const requestedAidOffers = await AidOffer.find({
      "requestedBy.donee": userAccount._id,
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
    
    const { donor } = req.params;

    if (!donor) {
      return res.status(400).json({ error: "Donor ID is missing" });
    }
    const userAccount = await accountSchema.findOne({ accountNo: donor });
    if (!userAccount) {
      res.status(401).json({ error: "Account not registered " });
      return;
    }
    const donorAidOffers = await AidOffer.find({ donor: userAccount._id}).populate({
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
    const aidOffers = await AidOffer.find({status:"open"}).populate({
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

const getAidOfferDetail=async(req,res)=>{
  const {tId}=req.query;
  try{
  const aidOffer = await AidOffer.findOne({tId}).populate( {path: "donor requestedBy.donee acceptedDonee.donee"});
  if (!aidOffer) {
    return res.status(404).json({ error: "No aid offers found" });
  }
  res.status(200).json(aidOffer);}
 catch (error) {
  console.error(error);
  res.status(500).json({ error: "Internal Server Error" });
}
}

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
  getAidOfferDetail
};
