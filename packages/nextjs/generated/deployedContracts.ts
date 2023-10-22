const contracts = {
  5: [
    {
      chainId: "5",
      name: "goerli",
      contracts: {
        YourContract: {
          address: "0xe4f0df38bB7632e92876FEFafD5FD8Df9cCD4E46",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_owner",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "greetingSetter",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "bytes32",
                  name: "assertionId",
                  type: "bytes32",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "newDataPoint",
                  type: "string",
                },
              ],
              name: "DataPointChange",
              type: "event",
            },
            {
              inputs: [],
              name: "dataPoint",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "dataPoints",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "assertionId",
                  type: "bytes32",
                },
              ],
              name: "getAssertion",
              outputs: [
                {
                  components: [
                    {
                      components: [
                        {
                          internalType: "bool",
                          name: "arbitrateViaEscalationManager",
                          type: "bool",
                        },
                        {
                          internalType: "bool",
                          name: "discardOracle",
                          type: "bool",
                        },
                        {
                          internalType: "bool",
                          name: "validateDisputers",
                          type: "bool",
                        },
                        {
                          internalType: "address",
                          name: "assertingCaller",
                          type: "address",
                        },
                        {
                          internalType: "address",
                          name: "escalationManager",
                          type: "address",
                        },
                      ],
                      internalType:
                        "struct OptimisticOracleV3Interface.EscalationManagerSettings",
                      name: "escalationManagerSettings",
                      type: "tuple",
                    },
                    {
                      internalType: "address",
                      name: "asserter",
                      type: "address",
                    },
                    {
                      internalType: "uint64",
                      name: "assertionTime",
                      type: "uint64",
                    },
                    {
                      internalType: "bool",
                      name: "settled",
                      type: "bool",
                    },
                    {
                      internalType: "contract IERC20",
                      name: "currency",
                      type: "address",
                    },
                    {
                      internalType: "uint64",
                      name: "expirationTime",
                      type: "uint64",
                    },
                    {
                      internalType: "bool",
                      name: "settlementResolution",
                      type: "bool",
                    },
                    {
                      internalType: "bytes32",
                      name: "domainId",
                      type: "bytes32",
                    },
                    {
                      internalType: "bytes32",
                      name: "identifier",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "bond",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "callbackRecipient",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "disputer",
                      type: "address",
                    },
                  ],
                  internalType: "struct OptimisticOracleV3Interface.Assertion",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "assertionId",
                  type: "bytes32",
                },
              ],
              name: "getAssertionResult",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_dataCount",
                  type: "uint256",
                },
              ],
              name: "getSettledData",
              outputs: [
                {
                  internalType: "int256",
                  name: "",
                  type: "int256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_dataPoint",
                  type: "string",
                },
              ],
              name: "setDataPoint",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "assertionId",
                  type: "bytes32",
                },
              ],
              name: "settleAndGetAssertionResult",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_dataCount",
                  type: "uint256",
                },
              ],
              name: "settleRequest",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "totalCounter",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "userDataPointCounter",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
