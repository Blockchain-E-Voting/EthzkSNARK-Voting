import React, { Component } from 'react'
import store from '../../../store'
import Countdown from 'react-countdown-now';
import { Image, Reveal } from "semantic-ui-react";
import  ElectionForm  from '../electionForm/ElectionForm'
import ProofForm from '../proof/ProofForm'



class ElectionCountDown extends Component {

  constructor(props){
    super(props)
    this.handleProof=this.handleProof.bind(this)
    this.checkHash=this.checkHash.bind(this)
    this.state = {
          uistate:1,
      }
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
  hashcontractInstance = web3.eth.contract(abi).at('0x3A6Df9F9195E1510CC3c3828D74b87cC2Fa458CF')

  var I = ["1"]


  var A = ["0x2800c7115c3eab69e0e78197236f98eb4eb88d9efd082ec59fb6747265b2ad27", "0xe9f847ae934a4f9c19481269a42811530f9b8587c264593aaab47ce798b6d7b"]
  var A_p = ["0x1f0fc83e013f02ef082679aa7ed3a9ac1903dda5937a6f4d7cbc22e2bfd546be", "0x4e7aeab1ad50e54ecb9c5ae337c3237ca27b47b1bb913f839668d061fbf2f76"]
  var B = [["0x22ef60c3ee9bb13b6f4fd63bd5f3f1fb62f5d90b57616e2868ac59b4bace4687", "0x2a0fd0cd1ded86842fa37cf0435371401c0b9ef01bcdb4805f52650c7a3fdb2e"], ["0x181d1aa3861814880ead91932808f819e647f46cb8b1021b5fa7453e5c3adf0c", "0x6d0cd36ec5e6ee281df408a07136681c3c3de856d81bb99187f108dcb39d8d3"]]
  var B_p = ["0x2cde28926b6754273b8527f85147da1da1d1ddfd453a5e542ecad7abab68002", "0x1bb233a77c54dfd2a8871c18489292f9754bfc039ea6f2afd3dd11482cd48898"]
  var C = ["0x1b59ead91af82c95b4492dc848b2204c77e238b9055a23e6ec3bc44a2518b7cc", "0xdfeb739e648588894ea97fd9ba6a79ad14ec363a4b57af8010e96087053af46"]
  var C_p = ["0x17fa8d4fea5e7dfb65836ebfabdc4ef38b1cad7cf7800eedd62779319ac747a9", "0x61a99f65e4b38db512fbe9a346ae18cd7fb2e9fd9231b6ee92c6773b521d501"]
  var H = ["0x2f5f43f6e12aff0664791b6046569eb6277081bfa803dd3676cdc7d206f67b10", "0x683937b89307ee6edb6f84345297f235265c8df1e8826d3e4b271dc34c48d31"]
  var K = ["0x1170fa6bb81c4e5fd8938f7f5faf7269e2b92cc99d65f000cd03cbb67b749dea", "0x2aa8fa7a54a9bed7548dba722b5a765f9a4cd6fc77867079d049724719ffe8c2"]



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

               //console.log(result2);
               that.setState({uistate:2})
             })
           //
         }else{
           console.log("")
         }
         });



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
