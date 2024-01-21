// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Donations {
    address public contractOwner;

    // Use mappings to associate tId with Aid
    mapping(uint => uint256) private aidFundCollected;

    event aidOfferTransaction(
        address indexed donor,
        address indexed donee,
        uint indexed tId,
        uint256 amount,
        uint256 time
    );
    event aidRequestTransaction(
        address indexed donor,
        address indexed donee,
        uint indexed tId,
        uint256 amount,
        uint256 time
    );

    modifier amountCheck() {
        require(msg.value > 0, "Amount should be greater than 0 wei");
        _;
    }


    constructor() {
        contractOwner = msg.sender;
    }

    function DonorOfferSend(
        uint _tId,
        address payable _donee,
        uint256 _time
    )
        external
        payable
        amountCheck
        returns (uint256)
    {
        require(_tId > 0, "Invalid tId");
        require(_time> 0 , "Invalid Time");
        require(msg.sender != _donee, "Sender cannot be the donee");
        (bool callSuccess, ) = _donee.call{value: msg.value}("");
        require(callSuccess, "Call failed");
        aidFundCollected[_tId] += msg.value;
        emit aidOfferTransaction(msg.sender, _donee, _tId, msg.value, _time);
        return aidFundCollected[_tId];
    }

    function AidRequestRecieved(
        uint _tId,
        address payable _donee,
        uint256 _time
    )
        external
        payable
        amountCheck
        returns (uint256)
    {
        require(_tId > 0, "Invalid tId");
        require(_time> 0 , "Invalid Time");
        require(msg.sender != _donee, "Sender cannot be the donee");
        (bool callSuccess, ) = _donee.call{value: msg.value}("");
        require(callSuccess, "Call failed");
        aidFundCollected[_tId] += msg.value;
        emit aidRequestTransaction(msg.sender, _donee, _tId, msg.value, _time);
        return aidFundCollected[_tId];
    }

    function getCollectedFundInfo(uint _tId) external view returns (uint256) {
        return aidFundCollected[_tId];
    }
}
