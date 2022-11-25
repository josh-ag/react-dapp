//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;
// set solidity version

// import hardhat console
import "hardhat/console.sol";

contract Token {
    //token info.
    string public name = "Beta Gems";
    string public symbol = "BGC";
    uint256 public totalSupply = 1000000;
    mapping(address => uint256) balances;

    constructor() {
        //set deployer token to total token above
        balances[msg.sender] = totalSupply;
    }

    //transfer to an address some amount of token
    function transfer(address to, uint256 amount) external {
        //requre senders balc not less than amount want to send
        require(balances[msg.sender] >= amount, "Not Enough Tokens");

        //subtract amount from sender balc
        balances[msg.sender] -= amount;

        //transfer to address
        balances[to] += amount;
    }

    //return address balc
    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
