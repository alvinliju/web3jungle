const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const Web3JungleContract = await hre.ethers.getContractFactory("Web3JungleContract");

  // Deploy the contract
  const web3JungleContract = await Web3JungleContract.deploy();

  // Wait for the deployment to complete (ethers v6)
  await web3JungleContract.waitForDeployment();

  // Log the contract address
  console.log("Web3JungleContract deployed to:", await web3JungleContract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
