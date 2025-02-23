// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./AlienNFT.sol";
import "./RobotNFT.sol";

contract CyborgNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    AlienNFT public alienContract;
    RobotNFT public robotContract;

    struct Cyborg {
        uint8 alienDNA;
        uint8 robotDNA;
        uint8 powerLevel;
    }

    mapping(uint256 => Cyborg) public cyborgs;

    constructor(address _alienContract, address _robotContract) ERC721("CyborgNFT", "CYBORG") {
        alienContract = AlienNFT(_alienContract);
        robotContract = RobotNFT(_robotContract);
    }

    function merge(uint256 alienTokenId, uint256 robotTokenId) public returns (uint256) {
        require(alienContract.ownerOf(alienTokenId) == msg.sender, "You don't own this Alien");
        require(robotContract.ownerOf(robotTokenId) == msg.sender, "You don't own this Robot");

        AlienNFT.Alien memory alien = alienContract.getAlien(alienTokenId);
        RobotNFT.Robot memory robot = robotContract.getRobot(robotTokenId);

        uint8 alienDNA = uint8((alien.eyes + alien.tentacles + alien.color) % 256);
        uint8 robotDNA = uint8((robot.arms + robot.legs + robot.material) % 256);
        uint8 powerLevel = uint8(((alienDNA + robotDNA) * 7) % 100) + 1;

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(msg.sender, newTokenId);
        cyborgs[newTokenId] = Cyborg(alienDNA, robotDNA, powerLevel);

        alienContract.transferFrom(msg.sender, address(this), alienTokenId);
        robotContract.transferFrom(msg.sender, address(this), robotTokenId);

        return newTokenId;
    }

    function getCyborg(uint256 tokenId) public view returns (Cyborg memory) {
        require(_exists(tokenId), "Cyborg does not exist");
        return cyborgs[tokenId];
    }
}

