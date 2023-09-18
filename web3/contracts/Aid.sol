// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

library Aid {
    struct Donate {
        string aidType;
        string name;
        uint256 quantity;
        uint256 tID;
        uint256 index;
        address donee;
        address donor;
        Status donationStatus;
        bool flag;
    }

    struct DonorOffer {
        string aidType;
        string name;
        uint256 quantity;
        uint256 tID;
        uint256 requests;
        address donor;
        bool flag;
    }

    enum Status {
        REQUESTED,
        ACCEPTED,
        COMPLETED
    }
}
