// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract RobotNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Robot {
        uint8 arms;
        uint8 legs;
        uint8 material;
    }

    mapping(uint256 => Robot) public robots;

    constructor() ERC721("RobotNFT", "ROBOT") {}

    function mint(address to, uint8 arms, uint8 legs, uint8 material) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(to, newTokenId);
        robots[newTokenId] = Robot(arms, legs, material);
        return newTokenId;
    }

    function getRobot(uint256 tokenId) public view returns (Robot memory) {
        require(_exists(tokenId), "Robot does not exist");
        return robots[tokenId];
    }
}

