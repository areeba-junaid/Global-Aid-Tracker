const { expect } = require("chai");
const { ethers } = require("hardhat");
const nullAddress = "0x" + "0".repeat(40);

describe("Deploy Contract", function () {
  let deployer, donee1, donee2, donee3, donee4, donee5, donee6, donor1, donor2;
  let donateContract;

  before(async function () {
    [deployer, donee1, donee2, donee3, donee4, donee5, donee6, donor1, donor2] =
      await ethers.getSigners();
    const donate = await ethers.getContractFactory("Donations");
    donateContract = await donate.deploy();
    //donee1 register and insert Aid
    await donateContract
      .connect(donee1)
      .registerUser("Donee1", "donee1@example.com", "India", 123456, 0);
    await donateContract
      .connect(donee2)
      .registerUser("Donee2", "donee2@example.com", "Pakistan", 123456, 0);
    await donateContract
      .connect(donor1)
      .registerUser("Donor1 ", "donor1@example.com", "USA", 123456, 1);
    await donateContract
      .connect(donor2)
      .registerUser("Donor1 ", "donor1@example.com", "Canada", 123456, 1);
  });

  describe("Creating DonorOffer", function () {
    before(async function () {
      //donee1 register and insert Aid
      await donateContract
        .connect(donor1)
        .createDonorOffers("Food", "Milk", 5, 100); //index 0
      await donateContract
        .connect(donor2)
        .createDonorOffers("Medical", "Panadol", 10, 200); //1
    });
    it("Donee Not Allowed to Make Offer", async function () {
      await expect(
        donateContract
          .connect(donee1)
          .createDonorOffers("Medical", "Panadol", 10, 200) //2
      ).to.be.reverted;
    });

    it("Checking DonorOffer1 Value", async function () {
      const Data = await donateContract.getAllDonorOffers();
      const userData = Data[0];
      expect(userData.quantity).to.equal(5);
      expect(userData.requests).to.equal(0);
      expect(userData.flag).to.equal(true);
      expect(userData.donor).to.equal(donor1.address);
    });
    it("Checking DonorOffer2 Value", async function () {
      const Data = await donateContract.getAllDonorOffers();
      const userData = Data[1];
      expect(userData.quantity).to.equal(10);
      expect(userData.requests).to.equal(0);
      expect(userData.donor).to.equal(donor2.address);
      expect(userData.flag).to.equal(true);
    });

    describe("Request to DonorOffer", function () {
      before(async function () {
        await donateContract
          .connect(donor1)
          .createDonorOffers("Food", "Milk", 5, 100); //index 0
        await donateContract
          .connect(donor2)
          .createDonorOffers("Medical", "Panadol", 10, 200); //1
        await donateContract.connect(donee1).requestDonorOffers(1, 200);
        await donateContract.connect(donee2).requestDonorOffers(1, 200);
        await donateContract.connect(donee3).requestDonorOffers(1, 200);
      });
      it("Donee Requests Updatated in List,Index", async function () {
        //donee1 Request.
        let Data = await donateContract.getAllDoneeAids();
        userData = Data[0];
        expect(userData.aidType).to.equal("Medical");
        expect(userData.name).to.equal("Panadol");
        expect(userData.tID).to.equal(200);
        expect(userData.index).to.equal(0);
        expect(userData.donee).to.equal(donee1.address);
        expect(userData.donor).to.equal(donor2.address);
        expect(userData.donationStatus).to.equal(0);
        expect(userData.flag).to.equal(true);

        //donee2 Request.

        userData = Data[1];
        expect(userData.index).to.equal(1);
        expect(userData.donee).to.equal(donee2.address);
        expect(userData.donor).to.equal(donor2.address);
        expect(userData.donationStatus).to.equal(0);
        expect(userData.flag).to.equal(true);
        //donee3  Request.
        userData = Data[2];
        expect(userData.index).to.equal(2);
        expect(userData.donee).to.equal(donee3.address);
        expect(userData.donor).to.equal(donor2.address);
        expect(userData.donationStatus).to.equal(0);
        expect(userData.flag).to.equal(true);
      });
      it("DonorOffer Requests Count", async function () {
        let Data = await donateContract.getAllDonorOffers();
        userData = Data[1];
        expect(userData.requests).to.equal(3);
      });
      it("More than 5 is to be reverted ", async function () {
        await donateContract.connect(donee4).requestDonorOffers(1, 200);
        await donateContract.connect(donee5).requestDonorOffers(1, 200);
        await expect(donateContract.connect(donee6).requestDonorOffers(1, 200))
          .to.be.reverted;
      });
      describe("Request Accepted", function () {
        before(async function () {
          await donateContract
            .connect(donor2)
            .acceptDonorOffer(1, 200, 1, donee2.address);
        });
        it("Donor List Updated", async function () {
          let Data = await donateContract.getAllDonorAids();
          userData = Data[0];
          expect(userData.aidType).to.equal("Medical");
          expect(userData.name).to.equal("Panadol");
          expect(userData.tID).to.equal(200);
          expect(userData.index).to.equal(0);
          expect(userData.donee).to.equal(donee2.address);
          expect(userData.donor).to.equal(donor2.address);
          expect(userData.donationStatus).to.equal(1);
          expect(userData.flag).to.equal(true);
        });
        it("Accepted Donor Offer Status Changed", async function () {
          let Data = await donateContract.getAllDoneeAids();
          userData = Data[1];
          expect(userData.donationStatus).to.equal(1);
          expect(userData.flag).to.equal(true);
        });
        it("UnAccepted Donor Offer Closed", async function () {
          let Data = await donateContract.getAllDoneeAids();
          let donee1Aid = Data[0];
          let donee3Aid = Data[2];
          expect(donee1Aid.donationStatus).to.equal(0);
          expect(donee1Aid.flag).to.equal(false);
          expect(donee3Aid.donationStatus).to.equal(0);
          expect(donee3Aid.flag).to.equal(false);
        });
        it("Rejected Requests are Closed", async function () {
          let Data = await donateContract.getAllDonorOffers();
          let Offer = Data[1];
          expect(Offer.tID).to.equal(200);
          expect(Offer.flag).to.equal(false);
        });
      });
    });
  });
});
