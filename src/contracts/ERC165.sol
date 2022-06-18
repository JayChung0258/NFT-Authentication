// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./interfaces/IERC165.sol";

contract ERC165 is IERC165 {
    constructor() {
        _registerInterface(bytes4(keccak256("supportsInterface(bytes4)")));
    }

    // hash table to keep track of contract fingerprint data of byte function conversions
    mapping(bytes4 => bool) public _supportedInterfaces;

    // check if the interface registered or not
    function supportsInterface(bytes4 interfaceId)
        external
        view
        override
        returns (bool)
    {
        return _supportedInterfaces[interfaceId];
    }

    // registering the interface
    function _registerInterface(bytes4 interfaceId) public {
        require(interfaceId != 0xffffffff, "ERC165: Invalid Interface");
        _supportedInterfaces[interfaceId] = true;
    }
}
