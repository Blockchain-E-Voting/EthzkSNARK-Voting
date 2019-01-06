import React, { Component } from 'react'
import store from '../../../store'
import { VoterContract } from './../../../abi/voterContract'
import { Form } from "semantic-ui-react";



class VoterRegForm extends Component {
  constructor(props,{ authData }) {
    super(props)
    authData = this.props
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)

  }

  handleChange(event){
     const target = event.target;
     const value = target.value;
     const name = target.id;

     this.setState({
       [name]: value
     });
 }

 handleSubmit(event){

   event.preventDefault()

   if (this.state.secret0 !== this.state.resecret0 || this.state.secret1 !== this.state.resecret1)
   {
     return alert('Secret Mismatch');
   }

   let web3 = store.getState().web3.web3Instance;
   var voterContractInstance;
   const fullname = this.state.name;
   const nic = this.state.nic;
   const secret0 = this.state.secret0;
   const secret1 = this.state.secret1;
   const voterCon = web3.eth.contract(VoterContract).at('0x61A298ef4F03a31824B320A4Fa42Dc86184DE3Be');

   web3.eth.getCoinbase((error, coinbase) => {
     // Log errors, if any.
     if (error) {
       console.error(error);
     }


     voterContractInstance=voterCon;
     voterContractInstance.addVoter(fullname,nic,secret0,secret1,{from: coinbase}, (error, txHash) => {
       if (error) { throw error }
       console.log(txHash)
     });

   });


   //this.props.onProfileFormSubmit(this.state.name)
 }


  render() {

    return(
      <div>
        <Form onSubmit={this.handleSubmit.bind(this)}>
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
