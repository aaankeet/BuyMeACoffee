// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

// Buy Me a Coffee Smart Contract
contract BuyCoffee {
    // Address of Owner;
    address owner;
    // Initial Coffee Price
    uint public price = 0.001 ether;

    struct Memo {
        string name;
        string message;
        uint time;
        address from;
    }

    Memo[] private memos;

    constructor() {
        owner = msg.sender;
    }

    // Only Owner Modifier
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    /*FUNCTIONS*/
    function buy(string memory name, string memory message) public payable {
        require(msg.value >= price, "You need to spend more");
        Memo memory memo = Memo(name, message, block.timestamp, msg.sender);
        (bool sent, ) = owner.call{value: msg.value}("");
        require(sent);
        memos.push(memo);
    }

    // Change Price of Coffee
    // Only Owner can Change
    function changePrice(uint newPrice) public onlyOwner {
        price = newPrice;
    }

    /*VIEW FUNCTIONS*/
    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }
}
