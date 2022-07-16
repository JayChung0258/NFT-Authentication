// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./ERC721Connector.sol";

contract NFTAuthentication is ERC721Connector {
    // array to store our nfts
    string[] public NFTAuthentications;
    string[] public TypeOfNFTTokens;
    uint256[] public MintTimeStamp;

    mapping(string => bool) _NFTAuthExists;

    function mint(string memory _infoMsg, string memory _type) public {
        require(
            !_NFTAuthExists[_infoMsg],
            "Error: NFTAuthentication Token already exists"
        );
        NFTAuthentications.push(_infoMsg);
        uint256 _id = NFTAuthentications.length - 1;

        _mint(msg.sender, _id);
        _NFTAuthExists[_infoMsg] = true;

        TypeOfNFTTokens.push(_type);
        MintTimeStamp.push(block.timestamp);
    }

    constructor() ERC721Connector("NFTAuthentication", "JAY") {}
}
