const AidRequest = require("../Model/aidRequestsDb");
const Id = require("nodejs-unique-numeric-id-generator");

// Create a new aid request
const createAidRequest = async (req, res) => {
  try {
    const { aidType, aidName, aidInfo, targetAmount, doneeId } = req.body;
    if (!aidType || !aidName || !aidInfo || !targetAmount || !doneeId) {
      return res
        .status(401)
        .json({ error: "Required fields are missing or incorrect" });
    }
    const newAidRequest = new AidRequest({
      tId: Id.generate(new Date().toJSON()),
      aidType,
      aidName,
      aidInfo,
      targetAmount,
      collectedAmount: 0,
      status: "open",
      doneeId,
    });

    const savedAidRequest = await newAidRequest.save();

    res.status(201).json(savedAidRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an existing aid request
const updateAidRequest = async (req, res) => {
  try {
    const { tId, aidType, aidName, aidInfo, targetAmount, status, donee } =
      req.body;

    if (
      !tId ||
      !aidType ||
      !aidName ||
      !aidInfo ||
      !targetAmount ||
      !status ||
      !donee
    ) {
      return res
        .status(401)
        .json({ error: "Required fields are missing or incorrect" });
    }

    let updatedAidRequest = await AidRequest.findOne({
      tId,
    }).populate("donee");

    if (!updatedAidRequest) {
      return res.status(404).json({ error: "Aid Request not found" });
    }

    if (updatedAidRequest.donee.accountNo !== donee) {
      return res.status(403).json({ error: "Unauthorized User" });
    }

    updatedAidRequest.aidType = aidType;
    updatedAidRequest.aidName = aidName;
    updatedAidRequest.aidInfo = aidInfo;
    updatedAidRequest.targetAmount = targetAmount;
    updatedAidRequest.status = status;
    updatedAidRequest = await updatedAidRequest.save();

    res.json(updatedAidRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateAidFund = async (req, res) => {
  //trigger by donor
  try {
    const { tId, collectedAmount } = req.body;
    if (!tId || !collectedAmount) {
      return res
        .status(401)
        .json({ error: "Required fields are missing or incorrect" });
    }
    let updatedAidRequest = await AidRequest.findOneAndUpdate(
      { tId },
      { $set: { collectedAmount } },
      { new: true }
    );
    if (!updatedAidRequest) {
      return res.status(404).json({ error: "Aid Request not found" });
    }
    if (collectedAmount >= updatedAidRequest.targetAmount) {
      updatedAidRequest.status = "closed";
      updatedAidRequest = await updatedAidRequest.save();
    }

    res.json(updatedAidRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Manually Closed
const closeAidRequest = async (req, res) => {
  try {
    const { tId, donee } = req.body;
    if (!tId || !donee) {
      return res
        .status(401)
        .json({ error: "Required fields are missing or incorrect" });
    }
    let aidRequest = await AidRequest.findOne({ tId }).populate("donee");
    if (!aidRequest) {
      return res.status(404).json({ error: "Aid Request not found" });
    }
    if (aidRequest.donee.accountNo !== donee) {
      return res.status(403).json({ error: "Unauthorized User" });
    }
    aidRequest.status = "closed";
    let updatedAidRequest = await aidRequest.save();
    res.json(updatedAidRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteAidRequest = async (req, res) => {
  try {
    const { tId, donee } = req.body;
    if (!tId || !donee) {
      return res
        .status(401)
        .json({ error: "Required fields are missing or incorrect" });
    }
    let aidRequest = await AidRequest.findOne({ tId }).populate("donee");
    if (!aidRequest) {
      return res.status(404).json({ error: "Aid Request not found" });
    }
    if (aidRequest.donee.accountNo !== donee) {
      return res.status(403).json({ error: "Unauthorized User" });
    }
    let deletedAidRequest;
    if (aidRequest.collectedAmount == 0) {
      deletedAidRequest = await AidRequest.findOneAndDelete({ tId });
    }

    if (!deletedAidRequest) {
      return res.status(404).json({ error: "Aid Request can't be deleted" });
    }
    res.json({ message: "Aid Request deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getDoneeAidRequest = async (req, res) => {
  try {
    const { accountNo } = req.params;
    console.log(req.params);
    const doneeAidRequests = await AidRequest.aggregate([
      {
        $lookup: {
          from: "accounts",
          localField: "donee",
          foreignField: "_id",
          as: "account",
        },
      },
      {
        $match: {
          "account.accountNo": accountNo,
        },
      },
      {
        $project: {
          account: 0, // Exclude the account field
        },
      },
    ]);
    if (!doneeAidRequests) {
      return res
        .status(404)
        .json({ error: "Aid Requests not found for the specified donee" });
    }

    res.json(doneeAidRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getDonorAidRequest = async (req, res) => {
  try {
    const { events } = req.body;
    const aidRequestDetails = [];
    for (const event of events) {
      const aidRequest = await AidRequest.findOne({ tId: event.tId });

      if (aidRequest) {
        aidRequestDetails.push({
          event,
          aidRequest,
        });
      }
    }

    res.json(aidRequestDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllAidRequest = async (req, res) => {
  try {
    const aidRequests = await AidRequest.find().populate("donee");
    res.json(aidRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createAidRequest,
  updateAidRequest,
  updateAidFund,
  closeAidRequest,
  deleteAidRequest,
  getDoneeAidRequest,
  getDonorAidRequest,
  getAllAidRequest,
};
