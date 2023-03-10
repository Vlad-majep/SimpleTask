import { ethers } from "hardhat";

async function main() {
  const [ owner ] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", owner.address);

  console.log("Account balance:", (await owner.getBalance()).toString());

  const task = await ethers.getContractFactory("SimpleTask");
  const token = await task.deploy(
    owner.address, "SimpleTask"
    );

  console.log("Contract address:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
