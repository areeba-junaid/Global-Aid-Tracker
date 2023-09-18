// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

//modifier to check if user is already registered
contract User {
    uint256 public userCount;
    uint256 public doneeCount;
    uint256 public donorCount;
    struct UserData {
        string name;
        string email;
        string country;
        uint256 phone;
        Type userType;
    }

    mapping(address => UserData) internal users;

    enum Type {
        DONEE,
        DONOR
    }
    event RegisteredUser(address indexed account, Type indexed userType);
    modifier oneProfile() {
        require(
            bytes(users[msg.sender].email).length == 0,
            "User already registered"
        );
        _;
    }

    constructor() {
        userCount = 0;
        doneeCount = 0;
        donorCount = 0;
    }

    function registerUser(
        string memory _name,
        string memory _email,
        string memory _country,
        uint256 _phone,
        Type _userType
    ) external oneProfile {
        UserData memory newUser = UserData(
            _name,
            _email,
            _country,
            _phone,
            _userType
        );
        userCount++;
        if (_userType == Type.DONEE) {
            doneeCount++;
        } else if (_userType == Type.DONOR) {
            donorCount++;
        }
        users[msg.sender] = newUser;
        emit RegisteredUser(msg.sender, _userType);
    }

    function getUserInfo(
        address account
    ) public view returns (UserData memory) {
        return users[account];
    }
}
