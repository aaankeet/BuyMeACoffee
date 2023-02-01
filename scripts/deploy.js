const hre = require("hardhat");
const { ethers } = require("hardhat");

async function consoleBalances(addresses) {
  for (let i = 0; i < addresses.length; i++) {
    let balance;
    balance = await ethers.provider.getBalance(addresses[i]);
    balance = ethers.utils.formatEther(balance);
    console.log(`Account Balance ${balance}`);
  }
}
async function consoleMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.time;
    const name = memo.name;
    const message = memo.message;
    const from = memo.from;
    console.log(
      `At ${timestamp}, Name: ${name}, Address: ${from}, Message: ${message}`
    );
  }
}

async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();

  let addresses = [owner.address, from1.address, from2.address, from3.address];

  const CoffeeContract = await ethers.getContractFactory("BuyCoffee");
  const coffeeContract = await CoffeeContract.deploy(owner.address);
  await coffeeContract.deployed();
  console.log(`Contract Deploy ${coffeeContract.address}`);

  await coffeeContract.changePrice(ethers.utils.parseEther("1"));

  const AMOUNT = ethers.utils.parseEther("1");

  console.log(`Balance Before Buying Coffee`);
  await consoleBalances(addresses);

  console.log(`Buying Coffee`);

  await coffeeContract.connect(from1).buy("Account1", "A", { value: AMOUNT });
  await coffeeContract.connect(from2).buy("Account2", "B", { value: AMOUNT });
  await coffeeContract.connect(from3).buy("Account3", "C", { value: AMOUNT });

  console.log(`Balances After Buying Coffee`);
  await consoleBalances(addresses);
  const memos = await coffeeContract.getMemos();
  await consoleMemos(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
