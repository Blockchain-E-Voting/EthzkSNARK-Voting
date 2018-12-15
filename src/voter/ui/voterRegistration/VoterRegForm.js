import React, { Component } from 'react'
import store from '../../../store'
import { VoterContract } from './../../../abi/voterContract'
import { Form } from "semantic-ui-react";



class VoterRegForm extends Component {
  constructor(props) {
    super(props)
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

   if (this.state.secret !== this.state.resecret)
   {
     return alert('Secret Mismatch');
   }

   let web3 = store.getState().web3.web3Instance;
   var voterContractInstance;
   const fullname = this.state.name;
   const nic = this.state.nic;
   const secret = web3.sha3(this.state.secret);
   const voterCon = web3.eth.contract(VoterContract).at('0x3Ac0981334cdc521bb88B8abf724995076a5Ec55');

   web3.eth.getCoinbase((error, coinbase) => {
     // Log errors, if any.
     if (error) {
       console.error(error);
     }
     voterContractInstance=voterCon;
     voterContractInstance.addVoter(fullname,nic,secret,{from: coinbase}, (error, txHash) => {
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
              <Form.Input fluid  label="Secret" id="secret"  placeholder="Secret" onChange={this.handleChange}/>
              <Form.Input fluid  label="Re Enter Secret" id="resecret"  placeholder="Re Enter Secret" onChange={this.handleChange}/>
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
