// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ScamBuzzerSubscriptionNFT is ERC721URIStorage, Ownable(msg.sender) {
    uint256 public nextTokenId;
    uint256 public constant PRICE = 0.01 ether;  // Price to mint an NFT

    event NFTMinted(address indexed minter, uint256 tokenId);

    constructor() ERC721("ScamBuzzer", "SCB") {}

    // Function to mint an NFT by paying the specified price
    function mintNFT(string memory tokenURI) external payable {
        require(msg.value >= PRICE, "Insufficient payment to mint NFT");

        uint256 tokenId = nextTokenId++;
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);

        emit NFTMinted(msg.sender, tokenId);
    }

    // Function to withdraw funds collected from minting
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
