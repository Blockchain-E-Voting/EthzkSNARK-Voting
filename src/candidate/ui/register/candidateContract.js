
const candidateContract =
[
	{
		"constant": false,
		"inputs": [
			{
				"name": "name",
				"type": "bytes32"
			},
			{
				"name": "postaladdress",
				"type": "bytes32"
			},
			{
				"name": "nationality",
				"type": "bytes32"
			},
			{
				"name": "party",
				"type": "bytes32"
			}
		],
		"name": "registerCandidate",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidateinfo",
		"outputs": [
			{
				"name": "name",
				"type": "bytes32"
			},
			{
				"name": "postaladdress",
				"type": "bytes32"
			},
			{
				"name": "nationality",
				"type": "bytes32"
			},
			{
				"name": "party",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "candidateID",
				"type": "uint256"
			}
		],
		"name": "getCandidate",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNumOfCandidates",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
//const candidateContract = web3.eth.contract(abi).at('0x5522F5943341f5Ad7DF99dE7d81B64Fb61F52D3a')

export {candidateContract};
