// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract A {
    uint256 public balanceToken;
    uint256 public balanceEther;
    address private owner;
    bool public status;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor(address _owner) {
        owner = _owner;
        balanceToken = 10000000000000000000;
        status = true;
    }

    function changeStatus(bool _status) public onlyOwner {
        status = _status;
    }

    receive() external payable {}

    // ******************************* Market ************************************

    mapping(address => User) userbook;

    struct User {
        uint256 balance;
    }

    modifier validBuy() {
        require(
            balanceToken > msg.value,
            "Contract is currently deplete, come back later"
        );
        _;
    }

    modifier validSell(uint256 _amount) {
        require(
            balanceEther > _amount,
            "Contract is currently deplete, come back later"
        );
        _;
    }

    function buy() public payable validBuy {
        balanceEther = balanceEther + msg.value;
        balanceToken = balanceToken - msg.value;
        userbook[msg.sender].balance = userbook[msg.sender].balance + msg.value;
    }

    function sell(uint256 _amount) public payable validSell(_amount) {
        balanceEther = balanceEther - _amount;
        balanceToken = balanceToken + _amount;
        userbook[msg.sender].balance = userbook[msg.sender].balance - _amount;
        payable(msg.sender).transfer(_amount);
    }
}
