const { ethers } = require("hardhat");

async function main() {
  const Contract = await ethers.getContractFactory("BuyCoffee");
  const contract = await Contract.deploy();
  await contract.deployed();

  console.log(`Deployed at ${contract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
