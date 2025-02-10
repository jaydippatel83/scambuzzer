// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ScamBuzzerSubscriptionNFT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;
    uint256 public constant PRICE = 0.01 ether; // Subscription price
    string public baseURI;

    mapping(address => bool) public hasActiveSubscription;
    mapping(uint256 => uint256) public expirationTimestamp;

    event SubscriptionPurchased(address indexed subscriber, uint256 tokenId, uint256 expiration);

    constructor(string memory _baseURI) ERC721("ScamBuzzer", "SBS") {
        baseURI = _baseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    // Purchase Subscription NFT
    function purchaseSubscription() external payable {
        require(msg.value >= PRICE, "Insufficient payment");
        require(!hasActiveSubscription[msg.sender], "Already subscribed");

        uint256 tokenId = nextTokenId++;
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, string(abi.encodePacked(baseURI, Strings.toString(tokenId), ".json")));

        expirationTimestamp[tokenId] = block.timestamp + 365 days; // Subscription for 1 year
        hasActiveSubscription[msg.sender] = true;

        emit SubscriptionPurchased(msg.sender, tokenId, expirationTimestamp[tokenId]);
    }

    // Check if subscription is still active
    function isSubscriptionActive(address user) external view returns (bool) {
        return hasActiveSubscription[user] && expirationTimestamp[nextTokenId - 1] > block.timestamp;
    }

    // Withdraw funds to the contract owner
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
