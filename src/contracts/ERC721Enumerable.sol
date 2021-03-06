// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./ERC721.sol";
import "./interfaces/IERC721Enumerable.sol";

// This is must for NFT market

contract ERC721Enumerable is ERC721, IERC721Enumerable {
    // register the interface functions first
    constructor() {
        _registerInterface(
            bytes4(
                keccak256("totalSupply(bytes4)") ^
                    ("tokenByIndex(bytes4)") ^
                    ("tokenOfOwnerByIndex(bytes4)")
            )
        );
    }

    uint256[] private _allTokens;

    // mapping from tokenId position in _allTokens array
    // 每個 Token 的 index
    mapping(uint256 => uint256) private _allTokensIndex;

    // mapping of owner to list of all owner token Ids
    // 這個 address 所有的 token id => list
    mapping(address => uint256[]) private _ownedTokens;

    // mapping from token ID to index of the owner tokens list
    // 這個 token id 在這 address tokens list 的第幾個 => index
    mapping(uint256 => uint256) private _ownedTokensIndex;

    // totalSupply : count the numbers of tokens at this moment
    /// @notice Count NFTs tracked by this contract
    /// @return A count of valid NFTs tracked by this contract, where each one of
    ///  them has an assigned and queryable owner not equal to the zero address
    function totalSupply() external view override returns (uint256) {
        return _allTokens.length;
    }

    // tokenByIndex : return the index of a token corresponding to the _allTokensIndex
    // input _index ex. 1,2,3,4 => return token id of these indexs in _alltokenIndex
    function tokenByIndex(uint256 _index)
        external
        view
        override
        returns (uint256)
    {
        require(_index < this.totalSupply(), "Global index is out of bounds!");
        return _allTokensIndex[_index];
    }

    // tokenOfOwnerByIndex : return the index of a token corresponding to the _ownedTokens[owner]
    // input address _owner, index => transform index of tokenlist in one address to token ID
    function tokenOfOwnerByIndex(address _owner, uint256 _index)
        external
        view
        override
        returns (uint256)
    {
        require(_index < balanceOf(_owner), "Owner index is out of bounds!");
        return _ownedTokens[_owner][_index];
    }

    // _mint : user call mint in NFTAuthentication.sol and finally run it here
    // override ERC721.sol _mint function
    function _mint(address to, uint256 tokenId) internal override(ERC721) {
        super._mint(to, tokenId);

        // 1. add tokens to the owner
        // 2. all tokens to our totalsupply - to allTokens

        _addTokensToAllTokenEnumeration(tokenId);
        _addTokensToOwnerEnumeration(to, tokenId);
    }

    // _addTokensToAllTokenEnumeration : add tokens to the _alltokens array and set the position of the tokens index
    function _addTokensToAllTokenEnumeration(uint256 tokenId) private {
        _allTokensIndex[tokenId] = _allTokens.length;
        _allTokens.push(tokenId);
    }

    // _addTokensToOwnerEnumeration : add index position to _ownedTokens[to]
    function _addTokensToOwnerEnumeration(address to, uint256 tokenId) private {
        // 1. add address and token id to the  _ownedTokens
        // 2. _ownedTokensIndex tokenId set to address of owendTokens position
        // excute this function with minting

        _ownedTokensIndex[tokenId] = _ownedTokens[to].length;
        _ownedTokens[to].push(tokenId);
    }
}
