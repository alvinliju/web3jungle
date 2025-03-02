const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const Web3JungleContract = await hre.ethers.getContractFactory("Web3Jungle");

  // Deploy the contract
  const web3JungleContractInstance = await Web3JungleContract.deploy();

  // Wait for the deployment to complete (ethers v6)
  await web3JungleContractInstance.waitForDeployment();

  // Log the contract address
  console.log("Web3JungleContract deployed to:", await web3JungleContractInstance.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
