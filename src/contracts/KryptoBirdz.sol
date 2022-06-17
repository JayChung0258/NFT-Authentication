// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./ERC721Connector.sol";

contract KryptoBird is ERC721Connector {
    // array to store our nfts
    string[] public KryptoBirdz;
    mapping(string => bool) _kryptoBirdzExists;

    function mint(string memory _kryptoBird) public {
        require(
            !_kryptoBirdzExists[_kryptoBird],
            "Error: kryptoBird already exists"
        );
        KryptoBirdz.push(_kryptoBird);
        uint256 _id = KryptoBirdz.length - 1;

        _mint(msg.sender, _id);
        _kryptoBirdzExists[_kryptoBird] = true;
    }

    constructor() ERC721Connector("KryptoBird", "JAY") {}
}
