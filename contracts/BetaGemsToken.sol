// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT || Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BGTC is ERC20 {
    constructor() ERC20("Beta Gems", "BGC") {
        _mint(msg.sender, 100000 * (10**18));
    }
}
