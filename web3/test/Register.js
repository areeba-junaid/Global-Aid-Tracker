const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Deploy Contract", function () {
  let deployer, donee, donor;
  let donateContract;
  before(async function () {
    [deployer, donee, donor] = await ethers.getSigners();
    const donate = await ethers.getContractFactory("Donations");
    donateContract = await donate.deploy();
  });

  describe("Donee Registration", function () {
    before(async function () {
      // Inserting Values
      await donateContract
        .connect(donee)
        .registerUser("Donee Name", "donee@example.com", "Country", 123456, 0);

      await donateContract
        .connect(donor)
        .registerUser("Donor Name", "donor@example.com", "Country", 123456, 1);
    });

    it("should allow to Register as Donee", async function () {
      const userData = await donateContract.getUserInfo(donee.address);
      expect(userData.name).to.equal("Donee Name");
      expect(userData.email).to.equal("donee@example.com");
      expect(userData.userType).to.equal(0);
    });
    it("should allow to Register as Donor", async function () {
      const userData = await donateContract.getUserInfo(donor.address);
      expect(userData.name).to.equal("Donor Name");
      expect(userData.email).to.equal("donor@example.com");
      expect(userData.userType).to.equal(1);
    });

    it("No double profile", async function () {
      await expect(
        donateContract
          .connect(donee)
          .registerUser("Donee Name", "donee@example.com", "Country", 123456, 0)
      ).to.be.reverted;
    });
  });
});
