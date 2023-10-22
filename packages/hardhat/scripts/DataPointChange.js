const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Listening for DataPointChange events with the account:",
    deployer.address
  );

  const Contract = await hre.ethers.getContractFactory("YourContract");
  const contractAddress = process.env.MY_CONTRACT_ADDRESS;
  const contract = Contract.attach(contractAddress);

  contract.on("DataPointChange", (greetingSetter, assertionId, newDataPoint, event) => {
    console.log("DataPointChange event emitted. Event details are:");
    console.log(`  Greeting Setter: ${greetingSetter}`);
    console.log(`  Assertion ID: ${assertionId}`);
    console.log(`  New Data Point: ${newDataPoint}`);
    console.log(`  Event: ${event}`);
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
