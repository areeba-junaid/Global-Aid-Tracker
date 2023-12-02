// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

//modifier to check if user is already registered
contract User {
    uint256 public userCount;
    uint256 public doneeCount;
    uint256 public donorCount;

    struct userInfo {
        Type userType;
        bool valid;
    }

    enum Type {
        DONEE,
        DONOR
    }
    mapping(address => userInfo) internal users;

    constructor() {
        userCount = 0;
        doneeCount = 0;
        donorCount = 0;
    }

    function registerUser(Type _userType) external {
        require(
            users[msg.sender].valid == false,
            "User is already registered."
        );
        require(
            _userType == Type.DONEE || _userType == Type.DONOR,
            "Invalid user type"
        );
        userCount++;

        userInfo memory newUser = userInfo(_userType, true);
        users[msg.sender] = newUser;
        if (_userType == Type.DONEE) {
            doneeCount++;
        } else if (_userType == Type.DONOR) {
            donorCount++;
        }
    }

    function getUserInfo() external view returns (Type, bool) {
        return (users[msg.sender].userType, users[msg.sender].valid);
    }
}

