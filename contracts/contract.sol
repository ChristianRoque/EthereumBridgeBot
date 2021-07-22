// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract A {
    function getBalance() public view returns (uint256) {
        uint256 balance = address(this).balance;
        return balance;
    }
}
