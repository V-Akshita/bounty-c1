// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AlienNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Alien {
        uint8 eyes;
        uint8 tentacles;
        uint8 color;
    }

    mapping(uint256 => Alien) public aliens;

    constructor() ERC721("AlienNFT", "ALIEN") {}

    function mint(address to, uint8 eyes, uint8 tentacles, uint8 color) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(to, newTokenId);
        aliens[newTokenId] = Alien(eyes, tentacles, color);
        return newTokenId;
    }

    function getAlien(uint256 tokenId) public view returns (Alien memory) {
        require(_exists(tokenId), "Alien does not exist");
        return aliens[tokenId];
    }
}

