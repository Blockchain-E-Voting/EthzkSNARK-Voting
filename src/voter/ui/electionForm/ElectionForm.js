import React, { Component } from 'react'
import store from '../../../store'
import { browserHistory } from 'react-router'
import { Image, Reveal,Grid, Button, Checkbox, Label, Form } from "semantic-ui-react";
import { candidateContract } from './../../../candidate/ui/register/candidateContract'

class ElectionForm extends Component {

  constructor(props){
    super(props)
    this.queryNumofCandidates=this.queryNumofCandidates.bind(this)
    this.handleAddCandidate=this.handleAddCandidate.bind(this)
    this.handleFormSubmit=this.handleFormSubmit.bind(this)
    this.getTransactionReceiptMined = this.getTransactionReceiptMined.bind(this)
    this.state = {
      name: '',
      candidates: [],
      loaderstate: false
    };

  }


  getTransactionReceiptMined = function getTransactionReceiptMined(txHash, interval) {
      const self = this;
       let web3 = store.getState().web3.web3Instance;
      const transactionReceiptAsync = function(resolve, reject) {
          web3.eth.getTransactionReceipt(txHash, (error, receipt) => {
              if (error) {
                  reject(error);
              } else if (receipt == null) {
                  setTimeout(
                      () => transactionReceiptAsync(resolve, reject),
                      interval ? interval : 500);
              } else {
                  resolve(receipt);
              }
          });
      };

      if (Array.isArray(txHash)) {
          return Promise.all(txHash.map(
              oneTxHash => self.getTransactionReceiptMined(oneTxHash, interval)));
      } else if (typeof txHash === "string") {
          return new Promise(transactionReceiptAsync);
      } else {
          throw new Error("Invalid Type: " + txHash);
      }
  };

  handleFormSubmit(event){
    event.preventDefault()
    var that = this;

   let web3 = store.getState().web3.web3Instance
 //  web3.eth.defaultAccount = "0x4432Ec4E9378F08E6fbacE81B168c461cffd6D47"
   var ElectioncontractInstance
   var abi = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "candidate",
				"type": "uint256"
			}
		],
		"name": "validCandidate",
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
				"name": "candidate",
				"type": "uint256"
			}
		],
		"name": "voteForCandidate",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "candidate",
				"type": "uint256"
			}
		],
		"name": "totalVotesFor",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
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
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidateList",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
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
				"name": "",
				"type": "uint256"
			}
		],
		"name": "votesReceived",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

   ElectioncontractInstance = web3.eth.contract(abi).at('0xB0110635A904588BaCC1DA6Ac1c8dd651f323864')
   const { voteForCandidate } = ElectioncontractInstance

   var txhash;
   web3.eth.getCoinbase((error, coinbase) => {
     if (error) {
       console.error(error);
     }

     that.setState({ loaderstate: true })
     for (const checkbox of this.selectedCheckboxes) {
       voteForCandidate(checkbox,{from: coinbase},(err,result) => {
         if(err) console.error('An error occured ::', err);
         txhash = result;
         return this.getTransactionReceiptMined(txhash).then(function (receipt) {
             if(receipt.status = '0x1'){
               that.setState ({ loaderstate: false})
               //that.props.onClickNextUi();
               that.props.changetoNextUi(txhash);
             }
           });


       })
    }





   })

   return browserHistory.push('/dashboard')

  }


  toggleCheckbox = label => {
   if (this.selectedCheckboxes.has(label)) {
     this.selectedCheckboxes.delete(label);
   } else {
     this.selectedCheckboxes.add(label);
   }
 }

  handleAddCandidate = (candidateName,party,no) => {
   this.setState({ candidates: this.state.candidates.concat([{ name: candidateName, Party:party, No:no }]) });
 }

  queryNumofCandidates (){
    let web3 = store.getState().web3.web3Instance
    var candidateContractInstance;
    candidateContractInstance=web3.eth.contract(candidateContract).at('0x8B74F1C1235f2dC2821338bcA739cD70306D394F')
    const { getNumOfCandidates } = candidateContractInstance;
    getNumOfCandidates((err,num)=>{
      if(err) console.error('An error occured ::', err);
      let numofcandidate=num.toNumber();
      const { getCandidate } = candidateContractInstance;
      for(let i=0;i<numofcandidate;i++){
        getCandidate(i+1,(err,result) => {
          if(err) console.error('An error occured ::', err);
          //console.log(result);
          console.log(web3.toUtf8(result[0]));
          this.handleAddCandidate(web3.toUtf8(result[0]),web3.toUtf8(result[2]),i+1)
        //  console.log(web3.toUtf8(result[1]));
        //  console.log(web3.toUtf8(result[2]));

        })

      }
    })

  }




  componentDidMount() {
   //this.queryCandidateDetails();
   this.queryNumofCandidates();
 }

 componentWillMount = () => {
   this.selectedCheckboxes = new Set();
 }


render(){

  return(

    <Grid columns='two' divided>
   <Grid.Row>

     <Grid.Column>
     <Form onSubmit={this.handleFormSubmit}>

          <h4>Candidates</h4>

          {this.state.candidates.map((candidate,i) => (
            <Form.Field key={i}>
            <Label as='a' image>
               <img src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
               {candidate.name}
             </Label>
              <Checkbox label={"x"+candidate.No} onChange={() => this.toggleCheckbox(candidate.No)}/>

            </Form.Field>
          ))}
          <Button type="submit"  className="small">Submit</Button>

        </Form>

     </Grid.Column>
     <Grid.Column>

     </Grid.Column>

   </Grid.Row>

   </Grid>




  )
}


}

export default ElectionForm
