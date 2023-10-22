import { expect } from "chai";
import { ethers } from "hardhat";
// import { YourContract } from "../typechain-types";

// describe("YourContract", function () {
//   // We define a fixture to reuse the same setup in every test.

//   let yourContract: YourContract;
//   before(async () => {
//     const [owner] = await ethers.getSigners();
//     const yourContractFactory = await ethers.getContractFactory("YourContract");
//     yourContract = (await yourContractFactory.deploy(owner.address)) as YourContract;
//     await yourContract.deployed();
//   });

//   describe("Deployment", function () {
//     it("Should have the right message on deploy", async function () {
//       expect(await yourContract.greeting()).to.equal("Building Unstoppable Apps!!!");
//     });

//     it("Should allow setting a new message", async function () {
//       const newGreeting = "Learn Scaffold-ETH 2! :)";

//       await yourContract.setGreeting(newGreeting);
//       expect(await yourContract.greeting()).to.equal(newGreeting);
//     });
//   });
// });

describe("YourContract", function () {
  let yourContract: any;
  let owner: any;

  beforeEach(async function () {
    // Deploy the contract
    const YourContract = await ethers.getContractFactory("YourContract");
    yourContract = await YourContract.deploy();
    [owner] = await ethers.getSigners();
  });

  describe("Constructor", function () {
    it("Sets owner correctly", async function () {
      expect(await yourContract.owner()).to.equal(owner.address);
    });
  });

  describe("setDataPoint", function () {
    it("should allow owner to set data point", async function () {
      const dataPoint = "Test data point";

      await expect(yourContract.connect(owner).setDataPoint(dataPoint))
        .to.emit(yourContract, "DataPointChange")
        .withArgs(owner.address, ethers.utils.id(dataPoint), dataPoint);

      const totalCounter = await yourContract.totalCounter();
      expect(totalCounter).to.equal(1);

      const userCounter = await yourContract.userDataPointCounter(owner.address);
      expect(userCounter).to.equal(1);
    });
  });

  // describe("settleAndGetAssertionResult", function () {

  //   it("should allow settling assertion and getting result", async function () {
  //     const dataPoint = "Test data point 2";

  //     const tx = await yourContract.connect(owner).setDataPoint(dataPoint);
  //     const receipt = await tx.wait();
  //     const event = receipt.events?.find(e => e.event === "DataPointChange");
  //     const assertionId = event?.args?.assertionId;

  //     await ethers.provider.send("evm_increaseTime", [1000]); // Wait 1 second

  //     const settled = await yourContract.settleAndGetAssertionResult(assertionId);
  //     expect(settled).to.be.true;

  //     const result = await yourContract.getAssertionResult(assertionId);
  //     expect(result).to.be.true;
  //   });

  // });
});
