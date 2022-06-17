// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/*
    a. nft address
    b. track of the token ids
    c. keep track of token owner address to token ids
    d. keep track of how many tokens an owner address has
    e. create an event that emit a transfer log
*/

contract ERC721 {
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );

    // Mapping from token id to the onwer
    mapping(uint256 => address) private _tokenOwner;

    // Mapping from onwer to number of owned tokens
    mapping(address => uint256) private _OwnedTokensCount;

    /// @notice Count all NFTs assigned to an owner
    /// @dev NFTs assigned to the zero address are considered invalid, and this
    ///  function throws for queries about the zero address.
    /// @param _owner An address for whom to query the balance
    /// @return The number of NFTs owned by `_owner`, possibly zero
    function balanceOf(address _owner) public view returns (uint256) {
        require(
            _owner != address(0),
            "ERC721: owner query for non-existent token"
        );
        return _OwnedTokensCount[_owner];
    }

    /// @notice Find the owner of an NFT
    /// @dev NFTs assigned to zero address are considered invalid, and queries
    ///  about them do throw.
    /// @param _tokenId The identifier for an NFT
    /// @return The address of the owner of the NFT
    function ownerOf(uint256 _tokenId) external view returns (address) {
        require(_exists(_tokenId), "Token has not yet been minted");
        address owner = _tokenOwner[_tokenId];
        require(
            owner != address(0),
            "ERC721: owner query for non-existent token"
        );
        return owner;
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        address owner = _tokenOwner[tokenId];
        return owner != address(0);
    }

    // virtual _mint function, be overrided in ERC721Enumerable.sol
    function _mint(address to, uint256 tokenId) internal virtual {
        // address(0) -> 0x000000
        require(to != address(0), "ERC721: minting to the zero address");
        require(!_exists(tokenId), "ERC721: token  already exist");

        _tokenOwner[tokenId] = to;
        _OwnedTokensCount[to]++;

        emit Transfer(address(0), to, tokenId);
    }
}
