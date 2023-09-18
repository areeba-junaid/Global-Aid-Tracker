const { expect } = require("chai");
const { ethers } = require("hardhat");
const nullAddress = "0x" + "0".repeat(40);

describe("Deploy Contract", function () {
  let deployer, donee1, donee2, donor1;
  let donateContract;

  before(async function () {
    [deployer, donee1, donee2, donor1] = await ethers.getSigners();
    const donate = await ethers.getContractFactory("Donations");
    donateContract = await donate.deploy();
    //donee1 register and insert Aid
    await donateContract
      .connect(donee1)
      .registerUser("Donee1", "donee1@example.com", "Country", 123456, 0);
    await donateContract
      .connect(donee2)
      .registerUser("Donee2", "donee2@example.com", "Country", 123456, 0);
    await donateContract
      .connect(donor1)
      .registerUser("Donor1 ", "donor1@example.com", "USA", 123456, 1);
  });

  describe("Donee Creating Aid Request", function () {
    before(async function () {
      //donee1 register and insert Aid
      await donateContract
        .connect(donee1)
        .aidRequest("Medical", "Panadol", 10, 101, donee1.address, nullAddress);

      await donateContract
        .connect(donee2)
        .aidRequest("Medical", "Panadol", 5, 100, donee2.address, nullAddress);
    });
    it("Checking Donor Will be rejected for Aid Request", async function () {
      await expect(
        donateContract
          .connect(donor1)
          .aidRequest("Medical", "Panadol", 5, 100, donee1.address, nullAddress)
      ).to.be.reverted;
    });

    it("Checking AidRequest Value", async function () {
      const Data = await donateContract.getAllDoneeAids();
      userData = Data[0];
      expect(userData.aidType).to.equal("Medical");
      expect(userData.name).to.equal("Panadol");
      expect(userData.quantity).to.equal(10);
      expect(userData.tID).to.equal(101);
      expect(userData.index).to.equal(0);
      expect(userData.donee).to.equal(donee1.address); // Corrected from donee1.Address
      expect(userData.donor).to.equal(nullAddress); // Corrected from donort
      expect(userData.donationStatus).to.equal(0);
      expect(userData.flag).to.equal(true);
    });
    it("Checking AidRequest Value 2", async function () {
      const Data = await donateContract.getAllDoneeAids();
      userData = Data[1];
      expect(userData.aidType).to.equal("Medical");
      expect(userData.name).to.equal("Panadol");
      expect(userData.quantity).to.equal(5);
      expect(userData.tID).to.equal(100);
      expect(userData.index).to.equal(1);
      expect(userData.donee).to.equal(donee2.address);
      expect(userData.donor).to.equal(nullAddress);
      expect(userData.donationStatus).to.equal(0);
      expect(userData.flag).to.equal(true);
    });
    describe("Donor Accepted Aid Request", function () {
      before(async function () {
        //donee1 register and insert Aid
        await donateContract
          .connect(donee1)
          .aidRequest("Medical", "Pan", 10, 101, donee1.address, nullAddress);
        await donateContract
          .connect(donee2)
          .aidRequest("Medical", "Pan", 5, 100, donee2.address, nullAddress);
        await donateContract
          .connect(donor1)
          .aidRequestAccept(donee2.address, 1, 100);
        await donateContract
          .connect(donor1)
          .aidRequestAccept(donee1.address, 0, 101);
      });
      it("check if Donee Accept it's own Request is rejected", async function () {
        await expect(
          donateContract
            .connect(donee2)
            .aidRequestAccept(donee2.address, 0, 101)
        ).to.be.reverted;
      });
      it("Donor Accepts donee1 Request", async function () {
        //donee updated
        let Data = await donateContract.getAllDoneeAids();
        userData = Data[0];
        expect(userData.aidType).to.equal("Medical");
        expect(userData.tID).to.equal(101);
        expect(userData.donationStatus).to.equal(1);
        expect(userData.donee).to.equal(donee1.address);
        expect(userData.index).to.equal(0);
        expect(userData.donor).to.equal(donor1.address);
        expect(userData.flag).to.equal(true);

        //donor updated

        Data = await donateContract.getAllDonorAids();
        userData = Data[1];
        expect(userData.aidType).to.equal("Medical");
        expect(userData.tID).to.equal(101);
        expect(userData.index).to.equal(1);
        expect(userData.donationStatus).to.equal(1);
        expect(userData.donee).to.equal(donee1.address);
        expect(userData.donor).to.equal(donor1.address);
        expect(userData.flag).to.equal(true);
      });
    });
    describe("Completed Aid Request", function () {
      before(async function () {
        //donee1 register and insert Aid
        await donateContract
          .connect(donee1)
          .aidRequest("Medical", "Pan", 10, 101, donee1.address, nullAddress); //0
        await donateContract
          .connect(donee2)
          .aidRequest("Medical", "Pan", 5, 100, donee2.address, nullAddress); //1
        await donateContract
          .connect(donor1)
          .aidRequestAccept(donee2.address, 1, 100); //0
        await donateContract
          .connect(donor1)
          .aidRequestAccept(donee1.address, 0, 101); //1
      });
      it("When Donor Completed  Donor 2 Donation", async function () {
        //donee2
        await donateContract.connect(donor1).aidRequestComplete(1, 0);
        let Data = await donateContract.getAllDoneeAids();
        userData = Data[1];
        expect(userData.aidType).to.equal("Medical");
        expect(userData.tID).to.equal(100);
        expect(userData.donationStatus).to.equal(2);
        expect(userData.index).to.equal(1);
        expect(userData.donee).to.equal(donee2.address);
        expect(userData.donor).to.equal(donor1.address);
        expect(userData.flag).to.equal(true);

        //donor updated
        Data = await donateContract.getAllDonorAids();
        userData = Data[0];
        expect(userData.aidType).to.equal("Medical");
        expect(userData.tID).to.equal(100);
        expect(userData.index).to.equal(0);
        expect(userData.donationStatus).to.equal(2);
        expect(userData.donee).to.equal(donee2.address);
        expect(userData.donor).to.equal(donor1.address);
        expect(userData.flag).to.equal(true);
      });
      it("Donee1 Completed Donation", async function () {
        await donateContract.connect(donee1).aidRequestComplete(0, 1);
        //donee updated
        let Data = await donateContract.getAllDoneeAids();
        userData = Data[0];
        expect(userData.aidType).to.equal("Medical");
        expect(userData.tID).to.equal(101);
        expect(userData.donationStatus).to.equal(2);
        expect(userData.donee).to.equal(donee1.address);
        expect(userData.donor).to.equal(donor1.address);
        expect(userData.flag).to.equal(true);

        //donor updated
        Data = await donateContract.getAllDonorAids();
        userData = Data[1];
        expect(userData.aidType).to.equal("Medical");
        expect(userData.tID).to.equal(101);
        expect(userData.donationStatus).to.equal(2);
        expect(userData.donee).to.equal(donee1.address);
        expect(userData.donor).to.equal(donor1.address);
        expect(userData.flag).to.equal(true);
      });
    });
  });
});
