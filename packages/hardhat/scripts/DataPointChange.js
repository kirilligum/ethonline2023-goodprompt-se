const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Fetching past DataPointChange events with the account:",
    deployer.address
  );

  const Contract = await hre.ethers.getContractFactory("YourContract");
  const contractAddress = process.env.MY_CONTRACT_ADDRESS;
  const contract = Contract.attach(contractAddress);

  const filter = contract.filters.DataPointChange();
  const events = await contract.queryFilter(filter);

  events.forEach((event) => {
    const { args, blockNumber, transactionHash, address } = event;
    console.log(`DataPointChange event found at block number ${blockNumber}`);
    console.log(`  Transaction hash: ${transactionHash}`);
    console.log(`  Contract address: ${address}`);
    console.log(`  Greeting Setter: ${args.greetingSetter}`);
    console.log(`  Assertion ID: ${args.assertionId}`);
    console.log(`  New Data Point: ${args.newDataPoint}`);
  });

  console.log("Finished fetching past DataPointChange events");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
