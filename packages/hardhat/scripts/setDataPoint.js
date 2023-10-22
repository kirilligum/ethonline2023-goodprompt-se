// import hre from "hardhat";
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Interacting with contracts with the account:",
    deployer.address
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Contract = await hre.ethers.getContractFactory("YourContract");

  // Get the contract address from the command line arguments
  // const contractAddress = process.argv[2];
  // if (!contractAddress) {
  //   console.error("Please provide the contract address as a command line argument");
  //   process.exit(1);
  // }
  const contractAddress = process.env.MY_CONTRACT_ADDRESS;

  const contract = Contract.attach(contractAddress);

  const setDataPointTx = await contract.setDataPoint("sample instruction and response");

  const receipt = await setDataPointTx.wait();

  console.log("setDataPoint function executed. Transaction details are:");
  console.log(`  Transaction hash: ${receipt.transactionHash}`);
  console.log(`  Block number: ${receipt.blockNumber}`);
  console.log(`  Gas used: ${receipt.gasUsed.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });