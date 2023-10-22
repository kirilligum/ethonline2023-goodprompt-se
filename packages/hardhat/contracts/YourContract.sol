//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

import "@uma/core/contracts/optimistic-oracle-v3/interfaces/OptimisticOracleV3Interface.sol";

contract YourContract {
	// State Variables
	address public immutable owner;
	// string public greeting = "Building Unstoppable Apps!!!";
	// string public dataPoint = "Building Unstoppable Apps!!!";
	uint256 public totalCounter = 0;
	mapping(address => uint256) public userDataPointCounter;

	// Events: a way to emit log statements from smart contract that can be listened to by external parties
	// event DataPointChange(address indexed greetingSetter, string newDataPoint);

	event DataPointChange(
		address indexed greetingSetter,
		bytes32 assertionId,
		string newDataPoint
	);

	// Constructor: Called once on contract deployment
	// Check packages/hardhat/deploy/00_deploy_your_contract.ts
	constructor(address _owner) {
		owner = _owner;
	}

	// Create an Optimistic Oracle V3 instance at the deployed address on Görli.
	OptimisticOracleV3Interface oov3 =
		OptimisticOracleV3Interface(0x9923D42eF695B5dd9911D05Ac944d4cAca3c4EAB);

	function setDataPoint(string memory _dataPoint) public payable {
		// Print data to the hardhat chain console. Remove when deploying to a live network.
		console.log(
			"Setting new dataPoint '%s' from %s",
			_dataPoint,
			msg.sender
		);

		totalCounter += 1;
		userDataPointCounter[msg.sender] += 1;

		// Each assertion has an associated assertionID that uniquly identifies the assertion. We will store this here.
		// Assert the truth against the Optimistic Asserter. This uses the assertion with defaults method which defaults
		// all values, such as a) challenge window to 120 seconds (2 mins), b) identifier to ASSERT_TRUTH, c) bond currency
		//  to USDC and c) and default bond size to 0 (which means we dont need to worry about approvals in this example).
		bytes32 assertionId = oov3.assertTruthWithDefaults(
			bytes(_dataPoint),
			address(this)
		);
		emit DataPointChange(msg.sender, assertionId, _dataPoint);
		// emit DataPointChange(msg.sender, _dataPoint);
	}

	// Settle the assertion, if it has not been disputed and it has passed the challenge window, and return the result.
	// result
	function settleAndGetAssertionResult(bytes32 assertionId)
		public
		returns (bool)
	{
		return oov3.settleAndGetAssertionResult(assertionId);
	}

	// Just return the assertion result. Can only be called once the assertion has been settled.
	function getAssertionResult(bytes32 assertionId)
		public
		view
		returns (bool)
	{
		return oov3.getAssertionResult(assertionId);
	}

	// Return the full assertion object contain all information associated with the assertion. Can be called any time.
	function getAssertion(bytes32 assertionId)
		public
		view
		returns (OptimisticOracleV3Interface.Assertion memory)
	{
		return oov3.getAssertion(assertionId);
	}
}
