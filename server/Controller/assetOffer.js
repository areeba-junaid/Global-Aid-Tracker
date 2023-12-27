const AssetOffer = require("../Model/assetOfferDb");
const accountSchema = require("../Model/accountDb");
const Id = require("nodejs-unique-numeric-id-generator");
const moment = require('moment');

// Create a new aid request
const createAssetOffer = async (req, res) => {
  try {
    const { aidType, aidName, aidInfo, account} = req.body;
    if (!aidType || !aidName || !aidInfo || !account ) {
      return res
        .status(401)
        .json({ error: "Required fields are missing or incorrect" });
    }
    const userAccount = await accountSchema.findOne(
     { accountNo: account }
    );
    if (!userAccount) {
      res.status(401).json({ error: "Account not registered " });
      return;
    }
    const date=Date.now();
    const createdAt = moment(date).format('DD MMM YYYY HH:mm:ss');
    const newAssetOffer = new AssetOffer({
      tId: Id.generate(new Date().toJSON()),
      aidType,
      aidName,
      aidInfo,
      status: "open",
      account:userAccount._id,
      createdAt,
    });

    const savedAssetOffer = await newAssetOffer.save();

    res.status(201).json(savedAssetOffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an existing aid request
const updateAssetOffer = async (req, res) => {
  try {
    const { tId, aidType, aidName, aidInfo, account } =
      req.body;

    if (
      !tId ||
      !aidType ||
      !aidName ||
      !aidInfo ||
      !account
    ) {
      return res
        .status(401)
        .json({ error: "Required fields are missingss or incorrect" });
    }

    let updatedAssetOffer = await AssetOffer.findOne({
      tId,
    }).populate("account");
    console.log(updatedAssetOffer);
    if (!updatedAssetOffer) {
      return res.status(404).json({ error: "Asset Offer not found" });
    }
    if (updatedAssetOffer.status !== 'open') {
      return res.status(403).json({ error: "Closed Offers can't be updated" });
    }
    if (updatedAssetOffer.account.accountNo !== account) {
      return res.status(403).json({ error: "Unauthorized User" });
    }
    updatedAssetOffer.aidType = aidType;
    updatedAssetOffer.aidName = aidName;
    updatedAssetOffer.aidInfo = aidInfo;
    updatedAssetOffer = await updatedAssetOffer.save();

    res.json(updatedAssetOffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Manually Closed
const closeAssetOffer = async (req, res) => {
  try {
    const { tId, account } = req.body;
    if (!tId || !account) {
      return res
        .status(401)
        .json({ error: "Required fields are missing or incorrect" });
    }
    let assetOffer = await AssetOffer.findOne({ tId }).populate("account");
    if (!assetOffer) {
      return res.status(404).json({ error: "Asset Offer not found" });
    }
    if (assetOffer.account.accountNo !== account) {
      return res.status(403).json({ error: "Unauthorized User" });
    }
    assetOffer.status = "closed";
    let updatedAssetOffer = await assetOffer.save();
    res.json(updatedAssetOffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteAssetOffer = async (req, res) => {
  try {
    const { tId, account } = req.body;
    if (!tId || !account) {
      return res
        .status(401)
        .json({ error: "Required fields are missing or incorrect" });
    }
    let assetOffer = await AssetOffer.findOne({ tId }).populate("account");
    if (!assetOffer) {
      return res.status(404).json({ error: "Aid Request not found" });
    }
    if (assetOffer.account.accountNo !== account) {
      return res.status(403).json({ error: "Unauthorized User" });
    }
    let deletedAssetOffer = await AssetOffer.findOneAndDelete({ tId });
    if (!deletedAssetOffer) {
      return res.status(404).json({ error: "Aid Request can't be deleted" });
    }
    res.json({ message: "Aid Request deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getUserAssetOffer = async (req, res) => {
    try {
      const { accountNo } = req.params;
      const userAccount = await accountSchema.findOne(
        { accountNo}
       );
       if (!userAccount) {
         console.log(userAccount);
         res.status(401).json({ error: "Account not registered " });
         return;
       }
      const userAssetOffers = await AssetOffer.find({ account: userAccount._id });
      if (!userAssetOffers || userAssetOffers.length ===0) {
        return res.status(404).json({ error: "Asset Offers not found for the specified account" });
      }
      res.json(userAssetOffers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
const getAllDoneeAssetOffer = async (req, res) => {
  try {
    const doneeAssetOffers = await AssetOffer.aggregate([
      {
        $lookup: {
          from: 'accounts',
          localField: 'account',
          foreignField: '_id',
          as: 'accountInfo'
        }
      },
      {
        $match: {
          'accountInfo.userType': 'donee'
        }
      }, ]);
    
    if (!doneeAssetOffers || doneeAssetOffers.length === 0) {
        return res.json({ message: "Asset Not Found" });
     }
    res.json(doneeAssetOffers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllDonorAssetOffer = async (req, res) => {
  try {
    const donorAssetOffers = await AssetOffer.aggregate([
      {
        $lookup: {
          from: 'accounts',
          localField: 'account',
          foreignField: '_id',
          as: 'accountInfo'
        }
      },
      {
        $match: {
          'accountInfo.userType': 'donor'
        }
      }, ]);
    if (!donorAssetOffers || donorAssetOffers.length===0)
   {
    return res.json({message: "Asset Not Found"});
   }
    res.json(donorAssetOffers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createAssetOffer,
  updateAssetOffer,
  closeAssetOffer,
  deleteAssetOffer,
  getUserAssetOffer,
  getAllDoneeAssetOffer,
  getAllDonorAssetOffer,
};


