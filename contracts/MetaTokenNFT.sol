// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "erc721a/contracts/ERC721A.sol";

contract MetaTokenNFT is ERC721A {
    uint8 public maxSupply = 5;

    constructor() ERC721A("Fredy", "FRD") {}

    function safeMint(uint8 _quantity) external payable {
        _safeMint(msg.sender, _quantity);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmbjyiSFot7a83GmhUQKUqu8JVSEk6WjMZy3WyrKs41d2r/";
    }

    function promptDescription() external pure returns (string memory) {
        return "A Serene Forest Path";
    }

    function balanceOf(address owner) public view override returns (uint256) {
        return super.balanceOf(owner);
    }
}
