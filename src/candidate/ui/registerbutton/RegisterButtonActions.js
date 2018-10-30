import { browserHistory } from 'react-router'

const abi = [
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
				"type": "address"
			}
		],
		"name": "candidateinfo",
		"outputs": [
			{
				"name": "candidateAddress",
				"type": "address"
			},
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
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
const CandidateContract = web3.eth.contract(abi).at('0xFC197909DBEFDc9e3299A339a9E5726Bbb77A0c3')


export function registercandidate() {

  return function(dispatch) {
    const fullname = globalState.statusInput
    const address= globalState.address
    const nationality = globalState.nationality
    CandidateContract.registerCandidate(fullname,address,nationality, (error, txHash) => {
      if (error) { throw error }
    })
  }

}
