//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lock {
    struct Access {
        address user;
        bool access;
    }

    struct Item {
        uint256 id;       // Unique ID for each item
        string itemType;  // "pdf", "folder", "image", "url"
        string data;      // The URL or metadata of the item
    }

    mapping(address => Item[]) private items;
    mapping(address => mapping(address => bool)) private ownership;
    mapping(address => Access[]) private accessList;
    mapping(address => mapping(address => bool)) private previousData;
    uint256 private currentItemId;

    function addItem(address _user, string memory itemType, string memory data) external {
        require(
            keccak256(abi.encodePacked(itemType)) == keccak256(abi.encodePacked("pdf")) ||
            keccak256(abi.encodePacked(itemType)) == keccak256(abi.encodePacked("folder")) ||
            keccak256(abi.encodePacked(itemType)) == keccak256(abi.encodePacked("image")) ||
            keccak256(abi.encodePacked(itemType)) == keccak256(abi.encodePacked("url")),
            "Invalid item type"
        );
        items[_user].push(Item(currentItemId++, itemType, data));
    }

    function allow(address user) external {
        ownership[msg.sender][user] = true;
        if (previousData[msg.sender][user]) {
            for (uint256 i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == user) {
                    accessList[msg.sender][i].access = true;
                    return;
                }
            }
        }
        accessList[msg.sender].push(Access(user, true));
        previousData[msg.sender][user] = true;
    }

    function disallow(address user) external {
        ownership[msg.sender][user] = false;
        for (uint256 i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == user) {
                accessList[msg.sender][i].access = false;
                return;
            }
        }
    }

    function display(address _user) external view returns (Item[] memory) {
        require(_user == msg.sender || ownership[_user][msg.sender], "You do not have access");
        return items[_user];
    }

    function shareAccess() public view returns (Access[] memory) {
        return accessList[msg.sender];
    }
}
