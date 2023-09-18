// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./User.sol";
import "./Aid.sol"; // Import the library;

contract Donations is User {
    address public contractOwner;

    // Use mappings to store aid records for each user
    Aid.Donate[] private donorAids;
    Aid.Donate[] private doneeAids;
    Aid.DonorOffer[] private donorOffers;

    modifier onlyDonee() {
        require(
            users[msg.sender].userType == Type.DONEE,
            "Only Donee Acceptable"
        );
        _;
    }

    modifier onlyDonor() {
        require(
            users[msg.sender].userType == Type.DONOR,
            "Only Donor Acceptable"
        );
        _;
    }

    constructor() {
        contractOwner = msg.sender;
    }

    function aidRequest(
        //form
        string memory _aidType,
        string memory _name,
        uint256 _quantity,
        uint256 _tID,
        address _donee, //need later on
        address _donor
    ) public onlyDonee {
        uint256 _index = doneeAids.length;
        Aid.Status _donationStatus = Aid.Status.REQUESTED;
        Aid.Donate memory newAid = Aid.Donate(
            _aidType,
            _name,
            _quantity,
            _tID,
            _index,
            _donee,
            _donor, //first Time will be assign null
            _donationStatus,
            true
        );

        doneeAids.push(newAid); // Add the new aid record to the doneeAids array
    }

    function aidRequestAccept(
        address _donee,
        uint256 _id,
        uint256 _tId
    ) public onlyDonor {
        require(_id < doneeAids.length, "Invalid ID");
        doneeAids[_id].donationStatus = Aid.Status.ACCEPTED;
        doneeAids[_id].donor = msg.sender; //changing Null donor address
        uint256 index = donorAids.length;
        donorAids.push(
            Aid.Donate(
                doneeAids[_id].aidType,
                doneeAids[_id].name,
                doneeAids[_id].quantity,
                _tId,
                index,
                _donee,
                msg.sender,
                Aid.Status.ACCEPTED,
                true
            )
        );
    }

    function aidRequestComplete(uint256 _doneeId, uint256 _donorId) public {
        // Check if both indices are valid (not -1) before updating the status
        if (_doneeId >= 0 && _donorId >= 0) {
            doneeAids[_doneeId].donationStatus = Aid.Status.COMPLETED;
            donorAids[_donorId].donationStatus = Aid.Status.COMPLETED;
        }
    }

    function createDonorOffers(
        //form
        string memory _aidType,
        string memory _name,
        uint256 _quantity,
        uint256 _tID
    ) public onlyDonor {
        uint256 _request = 0;

        Aid.DonorOffer memory newDonorOffer = Aid.DonorOffer(
            _aidType,
            _name,
            _quantity,
            _tID,
            _request,
            msg.sender,
            true
        );
        donorOffers.push(newDonorOffer);
    }

    function requestDonorOffers(uint256 _Index, uint256 _tId) public onlyDonee {
        Aid.DonorOffer storage donorOffer = donorOffers[_Index];
        require(donorOffer.requests < 5, "Requests Exceeded");
        donorOffer.requests++;
        aidRequest(
            donorOffer.aidType,
            donorOffer.name,
            donorOffer.quantity,
            _tId,
            msg.sender,
            donorOffer.donor
        );
    }

    function acceptDonorOffer(
        uint256 Index,
        uint256 _tId,
        uint256 doneeIndex,
        address _donee
    ) public onlyDonor {
        Aid.DonorOffer storage Offer = donorOffers[Index];
        // find matching tID set donee to Accepted and rest flag to 0
        for (uint256 i = 0; i < doneeAids.length; i++) {
            if (doneeAids[i].tID == _tId && doneeAids[i].donee != _donee) {
                doneeAids[i].flag = false;
            }
        }
        doneeAids[doneeIndex].donationStatus = Aid.Status.ACCEPTED;
        uint256 index = donorAids.length;
        Aid.Donate memory newAid = Aid.Donate(
            Offer.aidType,
            Offer.name,
            Offer.quantity,
            _tId,
            index,
            _donee,
            msg.sender,
            Aid.Status.ACCEPTED,
            true
        );
        donorAids.push(newAid);
        donorOffers[Index].flag = false;
    }

    function getAllDoneeAids() public view returns (Aid.Donate[] memory) {
        return doneeAids;
    }

    function getAllDonorAids() public view returns (Aid.Donate[] memory) {
        return donorAids;
    }

    function getAllDonorOffers() public view returns (Aid.DonorOffer[] memory) {
        return donorOffers;
    }
}
