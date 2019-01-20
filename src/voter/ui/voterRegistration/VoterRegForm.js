import React, { Component } from 'react'
import store from '../../../store'
import { VoterContract } from './../../../abi/voterContract'
import { Form, Loader, Dimmer, Image } from "semantic-ui-react";




class VoterRegForm extends Component {
  constructor(props,{ authData }) {
    super(props)
    authData = this.props
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.getTransactionReceiptMined=this.getTransactionReceiptMined.bind(this);
    this.state = { loaderstate: false}

  }

  handleChange(event){
     const target = event.target;
     const value = target.value;
     const name = target.id;

     this.setState({
       [name]: value
     });
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

 handleSubmit(event){

   event.preventDefault()
   var that = this;

   if (this.state.secret0 !== this.state.resecret0 || this.state.secret1 !== this.state.resecret1)
   {
     return alert('Secret Mismatch');
   }else if(this.state.secret0 == null ||  this.state.resecret0 == null || this.state.secret1 == null || this.state.resecret1 == null){
     return alert('Secret Phrase can not be null');
   }

   let web3 = store.getState().web3.web3Instance;
   var voterContractInstance;
   const fullname = this.state.name;
   const nic = this.state.nic;
   const secret0 = this.state.secret0;
   const secret1 = this.state.secret1;
   const voterCon = web3.eth.contract(VoterContract).at('0x61A298ef4F03a31824B320A4Fa42Dc86184DE3Be');


   var txhash;
   web3.eth.getCoinbase((error, coinbase) => {
     // Log errors, if any.
     if (error) {
       console.error(error);
     }

     that.setState({ loaderstate: true})
     voterContractInstance=voterCon;
     voterContractInstance.addVoter(fullname,nic,secret0,secret1,{from: coinbase}, (error, txHash) => {
       if (error) { throw error }
      // console.log(txHash)
      txhash = txHash;
      return this.getTransactionReceiptMined(txhash).then(function (receipt) {
          if(receipt.status = '0x1'){
            that.setState({ loaderstate: false});
            that.props.onClickNextUi();
          }
        });

     });

   });


   //this.props.onProfileFormSubmit(this.state.name)
 }


  render() {


    return(
      <div>

        <Form onSubmit={this.handleSubmit.bind(this)} >
        <Dimmer active={this.state.loaderstate}  inverted>
         <Loader inverted />
         </Dimmer>

          <Form.Group widths="equal">
          <Form.Input fluid  label="First name" id="name"  placeholder="Full Name"  onChange={this.handleChange}/>
          <Form.Input fluid  label="NIC" id="nic"  placeholder="NIC No" onChange={this.handleChange}/>
          </Form.Group>

          <Form.Group widths="equal">
              <Form.Input fluid  label="Hash of Secret Phrase(out_0)" id="secret0"  placeholder="Secret0" onChange={this.handleChange}/>
              <Form.Input fluid  label="Re Enter Secret Hash of Secret Phrase(out_0)" id="resecret0"  placeholder="Re Enter Secret" onChange={this.handleChange}/>
          </Form.Group>

          <Form.Group widths="equal">
              <Form.Input fluid  label="Hash of Secret Phrase(out_1)" id="secret1"  placeholder="Secret1" onChange={this.handleChange}/>
              <Form.Input fluid  label="Re Enter Secret Hash of Secret Phrase(out_1)" id="resecret1"  placeholder="Re Enter Secret" onChange={this.handleChange}/>
          </Form.Group>


          <Form.Group inline>
              <Form.Button primary>Submit</Form.Button>
              <Form.Button>Reset</Form.Button>
            </Form.Group>
        </Form>
       </div>

    )
  }
}

export default VoterRegForm
