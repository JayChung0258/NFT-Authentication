// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./ERC165.sol";

/*
    a. nft address
    b. track of the token ids
    c. keep track of token owner address to token ids
    d. keep track of how many tokens an owner address has
    e. create an event that emit a transfer log
*/

contract ERC721 is ERC165 {
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );

    event Approval(
        address indexed owner,
        address indexed approved,
        uint256 indexed tokenId
    );

    // Mapping from token id to the onwer
    mapping(uint256 => address) private _tokenOwner;

    // Mapping from onwer to number of owned tokens
    mapping(address => uint256) private _OwnedTokensCount;

    // Mapping from token id to approved address
    mapping(uint256 => address) private _tokenApprovals;

    /// @param _owner An address for whom to query the balance
    /// @return The number of NFTs owned by `_owner`, possibly zero
    function balanceOf(address _owner) public view returns (uint256) {
        require(
            _owner != address(0),
            "ERC721: owner query for non-existent token"
        );
        return _OwnedTokensCount[_owner];
    }

    // ownerOf : check the address of particular token owner
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

    // _exists : check if particular tokenId exist or not
    function _exists(uint256 tokenId) internal view returns (bool) {
        address owner = _tokenOwner[tokenId];
        return owner != address(0);
    }

    // _mint : user call mint from KryptoBirdz.sol and run it here
    // virtual _mint function, be overrided in ERC721Enumerable.sol
    function _mint(address to, uint256 tokenId) internal virtual {
        // address(0) -> 0x000000
        require(to != address(0), "ERC721: minting to the zero address");
        require(!_exists(tokenId), "ERC721: token  already exist");

        _tokenOwner[tokenId] = to;
        _OwnedTokensCount[to]++;

        emit Transfer(address(0), to, tokenId);
    }

    // TranferFrom : tranfer one token from an address to another
    /// @param _from The current owner of the NFT
    /// @param _to The new owner
    /// @param _tokenId The NFT to transfer
    function _transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) internal {
        // 4. add the safe functionality :
        // a. require that the address receiving a token is not a zero address
        // b. require the address transfering the token actually owns the token
        require(_to != address(0), "Location address is not exists");
        require(this.ownerOf(_tokenId) == _from, "Not a valid address");

        // 1. add the token id to the address receiving the token
        _tokenOwner[_tokenId] = _to;

        // 2. update the balance of the address _from
        // 3. update the balance of the address _to
        _OwnedTokensCount[_from]--;
        _OwnedTokensCount[_to]++;

        emit Transfer(_from, _to, _tokenId);
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) public {
        // require(isApprovedOrOwner(msg.sender, _tokenId));
        _transferFrom(_from, _to, _tokenId);
    }

    // Optional: approval function make a address can access particular tokenId

    function approve(address _to, uint256 _tokenId) public {
        // 1. require that the person approving is the owner
        // 2. approving an address to a token(tokenId)
        // 3. require that we cant apprvoe sending token of the owenr to the owner
        // 4. update the map of the approval address
        address owner = this.ownerOf(_tokenId);
        require(_to != owner, "Error - approval to current owner");
        require(
            msg.sender == owner,
            "Currnet caller is not the owner of the token"
        );
        _tokenApprovals[_tokenId] = _to;
        emit Approval(owner, _to, _tokenId);
    }

    function isApprovedOrOwner(address spender, uint256 _tokenId)
        internal
        view
        returns (bool)
    {
        require(_exists(_tokenId), "token does not exist");
        address owner = this.ownerOf(_tokenId);
        // return (spender == owner || getApproved(_tokenId) == spender);
        return (spender == owner);
    }
}
