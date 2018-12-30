import React, { Component } from 'react'
import store from '../../../store'
import Countdown from 'react-countdown-now';
import { Image, Reveal } from "semantic-ui-react";
import  ElectionForm  from '../electionForm/ElectionForm'
import ProofForm from '../proof/ProofForm'
import { VoterContract } from './../../../abi/voterContract'



class ElectionCountDown extends Component {

  constructor(props){
    super(props)
    this.handleProof=this.handleProof.bind(this)
    this.checkHash=this.checkHash.bind(this)
    this.voted=this.voted.bind(this)
    this.state = {
          uistate:1,
      }

  }


  voted(){

    this.web3 = store.getState().web3.web3Instance
    //let voterContractInstance;
    this.voterContractInstance=this.web3.eth.contract(VoterContract).at('0xE35fD0447c71c701b7157173c50c1778CcfdD822')

    this.web3.eth.getCoinbase((error, coinbase) => {
      // Log errors, if any.
      if (error) {
        console.error(error);
      }

      this.voterContractInstance.voted(coinbase, {from: coinbase},function(err,result){
        // If no error, update user.
          if(err){
            console.log(err)
          }

      })

    })
  }


  checkHash(){
    var that = this;
  let web3 = store.getState().web3.web3Instance
//  web3.eth.defaultAccount = "0x4432Ec4E9378F08E6fbacE81B168c461cffd6D47"
  var hashcontractInstance
  var abi = [
	{
		"constant": true,
		"inputs": [],
		"name": "success",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "a",
				"type": "uint256[2]"
			},
			{
				"name": "a_p",
				"type": "uint256[2]"
			},
			{
				"name": "b",
				"type": "uint256[2][2]"
			},
			{
				"name": "b_p",
				"type": "uint256[2]"
			},
			{
				"name": "c",
				"type": "uint256[2]"
			},
			{
				"name": "c_p",
				"type": "uint256[2]"
			},
			{
				"name": "h",
				"type": "uint256[2]"
			},
			{
				"name": "k",
				"type": "uint256[2]"
			},
			{
				"name": "input",
				"type": "uint256[1]"
			}
		],
		"name": "sha256hashTest",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "a",
				"type": "uint256[2]"
			},
			{
				"name": "a_p",
				"type": "uint256[2]"
			},
			{
				"name": "b",
				"type": "uint256[2][2]"
			},
			{
				"name": "b_p",
				"type": "uint256[2]"
			},
			{
				"name": "c",
				"type": "uint256[2]"
			},
			{
				"name": "c_p",
				"type": "uint256[2]"
			},
			{
				"name": "h",
				"type": "uint256[2]"
			},
			{
				"name": "k",
				"type": "uint256[2]"
			},
			{
				"name": "input",
				"type": "uint256[1]"
			}
		],
		"name": "verifyTx",
		"outputs": [
			{
				"name": "r",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "s",
				"type": "string"
			}
		],
		"name": "Verified",
		"type": "event"
	}
]
  hashcontractInstance = web3.eth.contract(abi).at('0x553147865955a4b4108e63C3627671257A3676a1')

  var I = ["1"]


  var A = ["0xb10b80e7b44da0d565d3747dfc7594ab669df4f5221e5c460567a026a39b8d5", "0x131445a245e347acf2547a209e22c86f31c430dc3cfb0bd67b989c3760f8ccfb"]
  var A_p = ["0x21639659757931005c922b588323f9f43eedffb4b310ea968107f843276a08af", "0x23969d7b7eb1286723afd8452d234848c26a851546af1a92866f3da6cf17459e"]
  var B = [["0x154a710849e97206e032f1dcbc1afc12e4050c32bfb585adc294842d7688058f", "0x29998fc8d49e116ae424a520d1a38c2967fc916315a9e08b10123661c6372a03"], ["0x6ccae7acf537b9a4d2557ebfd651bff56098f8458ab2463d000b7faf0d786a8", "0x2de45ed1099df7c90188a6f67f268885d62501a8ae10efe562dc294c91b314f1"]]
  var B_p = ["0x2088fa162b029126b0b0d1b282fed5fecbf30003f5bd1cacc0272f330953d36f", "0x186fb292d33d4b4d8f4b9a2d15e310bea32d7e6bc0af3a2729bdd02d86199c7d"]
  var C = ["0x2f603ad3464b17af375734e16d9e25e2b1c039e739084a5c5a99511f80d01e38", "0x205fdd35cf36c6d23510a0431c3adec6039f083afe929cbd71284c5e2862b7d2"]
  var C_p = ["0x1591d96158e2edd84f6a9764dc5b1fe93eab1cdc5460e64658366466531f5a15", "0x15c204ea701716ff84afe0c2b7c260bfc1ec805aaa90eef22d87f956a8046002"]
  var H = ["0xe5ee61ca94c805e3539954eb19f9338700a29231911eaec60359f699406660c", "0x164e505d86840403279d55a43b7e5668f52a2aef53611f1b40ffb717a4a82f78"]
  var K = ["0x28e0ebbcf337570e0002676a69cd734db8bbf5959193dce00b6e5600d0d6588a", "0x17bc157cb574dc61ba22be32397bb73ecc1727793788817a406e172114021411"]



var txhash
 const { sha256hashTest } = hashcontractInstance
 const { get } = hashcontractInstance

 web3.eth.getCoinbase((error, coinbase) => {
   if (error) {
     console.error(error);
   }
   sha256hashTest(A, A_p, B, B_p, C, C_p, H, K, I,{from: coinbase},(err,result) => {
     if(err) console.error('An error occured ::', err);
     txhash = result
     if(result){
       //transaction hash returns. but still it is not added to block
       console.log(result)
       //check whether it is added to a block
       var events = hashcontractInstance.allEvents({fromBlock: 'latest', toBlock: 'latest', address:coinbase});
         events.watch(function(error, result3){
           //if it is added to a block
           if(txhash==result3.transactionHash){
              console.log("ok")
             get((err,result2) => {
               if(err) console.error('An error occured ::', err);

               console.log(result2);
               that.setState({uistate:2})
               that.voted()
             })
           //
         }else{
           console.log("Not written to block")
         }
         });



     }else{
       console.log("transaction error")
     }

   });

});




// console.log("success: "+hashcontractInstance.get())


}


  handleProof(){
    this.checkHash()

  }


render(){

  const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed && this.state.uistate==1) {
    // Render a complete state
    return <ProofForm onSubmitProofForm={this.handleProof} />;
  }else if(this.state.uistate==2){
    return <ElectionForm />
  } else {
    // Render a countdown
    return <span>{hours}:{minutes}:{seconds}</span>;
  }
};


  return(
    <div>
    <Countdown
    date={Date.now() + 5000}
    renderer={renderer}
  />

    </div>


  )
}


}

export default ElectionCountDown
