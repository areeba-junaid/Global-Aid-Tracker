// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./User.sol";

contract Donations is User {
    address public contractOwner;

    // Use mappings to associate tId with Aid
    mapping(uint => uint256) public aidFundCollected;

    event aidOfferTransaction(
        address indexed donor,
        address indexed donee,
        uint indexed tId,
        uint256 amount
    );
    event aidRequestTransaction(
        address indexed donor,
        address indexed donee,
        uint indexed tId,
        uint256 amount
    );

    modifier onlyDonee(address _donee) {
        require(users[_donee].userType == Type.DONEE, "Only Donee Acceptable");
        _;
    }

    modifier onlyDonor() {
        require(
            users[msg.sender].userType == Type.DONOR,
            "Only Donor Acceptable"
        );
        _;
    }

    modifier amountCheck() {
        require(msg.value > 0, "Amount Should be greater than 0 ETH");
        _;
    }

    constructor() {
        contractOwner = msg.sender;
    }

    function DonorOfferSend(
        uint _tId,
        address payable _donee
    )
        external
        payable
        onlyDonor
        onlyDonee(_donee)
        amountCheck
        returns (uint256)
    {
        require(_tId > 0, "Invalid tId");
        (bool callSuccess, ) = _donee.call{value: msg.value}("");
        require(callSuccess, "Call failed");
        aidFundCollected[_tId] += msg.value;
        emit aidOfferTransaction(msg.sender, _donee, _tId, msg.value);
        return aidFundCollected[_tId];
    }

    function AidRequestReecieved(
        uint _tId,
        address payable _donee
    )
        external
        payable
        onlyDonor
        onlyDonee(_donee)
        amountCheck
        returns (uint256)
    {
        require(_tId > 0, "Invalid tId");
        (bool callSuccess, ) = _donee.call{value: msg.value}("");
        require(callSuccess, "Call failed");
        aidFundCollected[_tId] += msg.value;
        emit aidRequestTransaction(msg.sender, _donee, _tId, msg.value);
        return aidFundCollected[_tId];
    }
}
