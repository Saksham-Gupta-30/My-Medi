// SPDX-License-Identifier: GPL-3.0

pragma solidity >= 0.7.0 <0.9.0;

contract MedicalRecord {
    struct Access {
        address user;
        bool access;
    }
    struct FileData {
        string url;
        string fileName;
        string timestamp;
        string fileType;
    }

    mapping(address => FileData[]) value;
    mapping(address => mapping(address => bool)) ownership;
    mapping(address => Access[]) accessList;
    mapping(address => mapping(address => bool)) previousData;

    function Add(string memory _url, string memory _fileName, string memory _timestamp, string memory _fileType) external {
        value[msg.sender].push(FileData(_url, _fileName, _timestamp, _fileType));
    }

    function Allow(address user) external {
        ownership[msg.sender][user] = true;
        if (previousData[msg.sender][user]) {
            for (uint i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == user) {
                    accessList[msg.sender][i].access = true;
                }
            }
        } else {
            accessList[msg.sender].push(Access(user, true));
            previousData[msg.sender][user] = true;
        }
    }

    function DisAllow(address user) public {
        ownership[msg.sender][user] = false;
        for (uint i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == user) {
                accessList[msg.sender][i].access = false;
            }
        }
    }

    function Display(address _user) external view returns (FileData[] memory) {
        require(
            _user == msg.sender || ownership[_user][msg.sender],
            "YOU DON'T HAVE ACCESS"
        );
        return value[_user];
    }

    function ShareAccess() public view returns (Access[] memory) {
        return accessList[msg.sender];
    }
}
