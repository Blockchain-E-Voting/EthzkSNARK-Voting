import React, { Component } from 'react'
import store from '../../../store'
import Countdown from 'react-countdown-now';
import { Image, Reveal, Button, Label } from "semantic-ui-react";
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
          zkProof:''
      }


  }


  voted(){
    var that = this;

    this.web3 = store.getState().web3.web3Instance
    //let voterContractInstance;
    this.voterContractInstance=this.web3.eth.contract(VoterContract).at('0x61A298ef4F03a31824B320A4Fa42Dc86184DE3Be')

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

          that.setState({uistate:2})

      })

    })
  }


  checkHash(){
    var zknproof=JSON.parse(this.state.zkProof);
    console.log(zknproof)
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
  hashcontractInstance = web3.eth.contract(abi).at('0x3e8012DD6e54D42BB386eeB83375a53bB47B067D')

  var I = ["1"]

var A = zknproof.proof.A;
var A_p = zknproof.proof.A_p;
var B = zknproof.proof.B;
var B_p = zknproof.proof.B_p;
var C = zknproof.proof.C;
var C_p = zknproof.proof.C_p;
var H = zknproof.proof.H;
var K = zknproof.proof.K;

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


  handleProof(data){
  //  console.log(data);
    this.setState({ zkProof: data }, () => {
      //console.log(this.state.jsonFile);
      this.checkHash();
    });


  }


render(){

  const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed && this.state.uistate==1) {
    // Render a complete state
    return <ProofForm onSubmitProofForm={this.handleProof} />;
  }else if(this.state.uistate==2){
    return <ElectionForm changetoNextUi={this.props.changeToResultUi} />
  } else {
    // Render a countdown
    return <div>
    <a href='/sha256hashgenerate.code' download>
    <Button> Download Arithmatic circuit </Button>
    </a>
    <a href='/sha256hashgenerate.code' download>
    <Button> Download Proving Key </Button>
    </a> <br/><br/><br/>
     <div className='rows'>
     <div className='row'>
      <span>
      <Label  style={{ fontSize: 50, color: '#ad6969' }}>{hours}h</Label>:
      <Label  style={{ fontSize: 50, color: '#ad6969' }}>{minutes}m:</Label>
      <Label  style={{ fontSize: 50, color: '#ad6969' }}> {seconds}s </Label>
      </span>
      </div>
    </div>
    </div>;
  }
};


  return(
    <div>
    <Countdown
    date={Date.now() + 20000}
    renderer={renderer}
  />

    </div>


  )
}


}

export default ElectionCountDown
