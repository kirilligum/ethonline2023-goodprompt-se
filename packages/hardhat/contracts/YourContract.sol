//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

import "@uma/core/contracts/optimistic-oracle-v2/interfaces/OptimisticOracleV2Interface.sol";
import "@uma/core/contracts/optimistic-oracle-v3/interfaces/OptimisticOracleV3Interface.sol";

contract YourContract {
	// State Variables
	address public immutable owner;
	// string public greeting = "Building Unstoppable Apps!!!";
	// string public dataPoint = "Building Unstoppable Apps!!!";
	uint256 public totalCounter = 0;
	mapping(address => uint256) public userDataPointCounter;
	mapping(uint256 => string) public dataPoints;

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
	OptimisticOracleV2Interface oo =
		OptimisticOracleV2Interface(0xA5B9d8a0B0Fa04Ba71BDD68069661ED5C0848884);
	bytes32 identifier = bytes32("YES_OR_NO_QUERY");
	uint256 requestTime = 0; // Store the request time so we can re-use it later.

	// bytes ancillaryData = bytes("Q:Did the temperature on the 25th of July 2022 in Manhattan NY exceed 35c? A:1 for yes. 0 for no.");
	function setDataPoint(string memory _dataPoint) public payable {
		// Print data to the hardhat chain console. Remove when deploying to a live network.
		console.log(
			"Setting new dataPoint '%s' from %s",
			_dataPoint,
			msg.sender
		);

		dataPoints[totalCounter] = _dataPoint;

		requestTime = block.timestamp; // Set the request time to the current block time.
		IERC20 bondCurrency = IERC20(
			0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6
		); // Use Görli WETH as the bond currency.
		uint256 reward = 0; // Set the reward to 0 (so we dont have to fund it from this contract).
		// Now, make the price request to the Optimistic oracle and set the liveness to 30 so it will settle quickly.
		oo.requestPrice(
			identifier,
			requestTime,
			bytes(_dataPoint),
			bondCurrency,
			reward
		);
		oo.setCustomLiveness(identifier, requestTime, bytes(_dataPoint), 30);

		// Each assertion has an associated assertionID that uniquly identifies the assertion. We will store this here.
		// Assert the truth against the Optimistic Asserter. This uses the assertion with defaults method which defaults
		// all values, such as a) challenge window to 120 seconds (2 mins), b) identifier to ASSERT_TRUTH, c) bond currency
		//  to USDC and c) and default bond size to 0 (which means we dont need to worry about approvals in this example).
		bytes32 assertionId = oov3.assertTruthWithDefaults(
			bytes(_dataPoint),
			address(this)
		);

		totalCounter += 1;
		userDataPointCounter[msg.sender] += 1;
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

	// Settle the request once it's gone through the liveness period of 30 seconds. This acts the finalize the voted on price.
	// In a real world use of the Optimistic Oracle this should be longer to give time to disputers to catch bat price proposals.
	function settleRequest(uint256 _dataCount) public {
		oo.settle(
			address(this),
			identifier,
			requestTime,
			bytes(dataPoints[_dataCount])
		);
	}

	// Fetch the resolved price from the Optimistic Oracle that was settled.
	function getSettledData(uint256 _dataCount) public view returns (int256) {
		return
			oo
				.getRequest(
					address(this),
					identifier,
					requestTime,
					bytes(dataPoints[_dataCount])
				)
				.resolvedPrice;
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
