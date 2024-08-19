const hre = require("hardhat");
require("dotenv").config();

const fxERC721RootContractABI = require("../token/ERC721FxRootContractABI.json");

const fxERC721RootAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de";
const walletAddress = `${process.env.WALLET_ADDRESS}`;

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const MetaTokenNFTFactory = await hre.ethers.getContractFactory(
    "MetaTokenNFT"
  );
  const metaTokenNFT = await MetaTokenNFTFactory.attach(
    process.env.CONTRACT_ADDRESS
  );

  const fxRootContract = await hre.ethers.getContractAt(
    fxERC721RootContractABI,
    fxERC721RootAddress
  );

  // Approve NFTs for transfer
  const approveTx = await metaTokenNFT
    .connect(deployer)
    .setApprovalForAll(fxERC721RootAddress, true);

  await approveTx.wait();

  console.log("NFT approval confirmed");

  // Deposit NFTs to Polygon Mumbai bridge
  const tokenAddress = "0xCB337A309A36cCd521F6C06Ed82701E2B0833487";
  const walletAddress = "0x74d6cB214C0C5f5Ceca007c617e2e0F6e343603D";
  for (let i = 0; i < 5; i++) {
    const depositTx = await fxRootContract
      .connect(deployer)
      .deposit(tokenAddress, walletAddress, i, "0x6566");

    await depositTx.wait();
  }

  console.log("NFT deposited on Polygon Mumbai");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// // We require the Hardhat Runtime Environment explicitly here. This is optional
// // but useful for running the script in a standalone fashion through `node <script>`.
// //
// // You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// // will compile your contracts, add the Hardhat Runtime Environment's members to the
// // global scope, and execute the script.
// const hre = require("hardhat");
// const fxRootContractABI = require("../token/ERC721FxRootContractABI.json");
// const tokenContractJSON = require("../token/MetaToken.json");

// const tokenAddress = "0xCB337A309A36cCd521F6C06Ed82701E2B0833487"; // place your erc20 contract address here
// const tokenABI = tokenContractJSON.abi;
// const fxERC20RootAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de";
// const walletAddress = "0x74d6cB214C0C5f5Ceca007c617e2e0F6e343603D"; // place your public address for your wallet here

// async function main() {
//   const tokenContract = await hre.ethers.getContractAt(tokenABI, tokenAddress);
//   const fxContract = await hre.ethers.getContractAt(
//     fxRootContractABI,
//     fxERC20RootAddress
//   );

//   const approveTx = await tokenContract.approve(fxERC20RootAddress, 500);
//   await approveTx.wait();

//   console.log("Approval confirmed");

//   const depositTx = await fxContract.deposit(
//     tokenAddress,
//     walletAddress,
//     500,
//     "0x6556"
//   );
//   await depositTx.wait();

//   console.log("Tokens deposited");
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
