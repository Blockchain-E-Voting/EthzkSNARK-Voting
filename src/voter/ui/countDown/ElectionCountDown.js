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
  hashcontractInstance = web3.eth.contract(abi).at('0x2c32d696B175802fb6aF410875C6935B7E439A9c')

  var I = ["1"]


  var A = ["0x2f6a568985b4b6c879780b454ab1ab5d5c2b9ff8fbe0dbcac29e18b333d2db65", "0x152edca682582683410a8e06ca99bca32a466cb210f2fcdac8cacc0b3bc07fa6"]
  var A_p = ["0x24ba60e4da990fa5316c26431379f391544d6eff7d6978a518e02a1dbd388a9d", "0x1c41f06294dce2c445a7a7a0c1c8b79b9214ef069061b42cc594bddd178cd645"]
  var B = [["0x9f5a2850efffa29f833527b4cc28cf385bc08b36d3c18e5a0aac583e517eb15", "0xd0f7c0a117a9c86e7a7063d5172c7e8c198cad7dd5292b56d06f16f96c06067"], ["0x216b16f387e3093f35a1e3e366a6e78b025189e7bdbb1a801282c8e5b5b6a2ea", "0x25ea4d278118362dd1683f21b2f299b42ac59a1bcd76476f7bd6d9a145e8b856"]]
  var B_p = ["0x2492b12772269abdd3b146e6ba805963b97db6acde1fec0a1d0e842b4688e866", "0x18f99452069d75bf61c304954f8d34063bd80d613cc1b2ecabe6bc9b4282e33"]
  var C = ["0x230a0b17b211c4f338895640264778dcecb8dfeccaa58b6849fe56b7897a376f", "0x2cba59f9fb37fccb17e7441cdba787b841a65ac17edcb1fc19ca68ea8eabb380"]
  var C_p = ["0x210b4b47c7b3cffe40d64b2bc759218008d102a5f361fe987b5e7c281d294097", "0x3053732fc5b3028e2295a3a920536c4665e54b0755b9c82d44b1ac0b5392108b"]
  var H = ["0x22b8cb4166a4b37638e93b6b7e1ce3c113364f0298c97e9bc83ef66ff1bd2074", "0x29c062865e212ed6ddb71c8265bf47848491cd6fe6ed569297fab9d5b3bd635"]
  var K = ["0x1e2abcfacfee992d0c7a7cda315662c7b947ba1bd867208acf26d276002c296e", "0x23af9abecd494c8b35847912af1b7e0a132c67aec6968cef94f1ea4e3d70974"]



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
