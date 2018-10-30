import React, { Component } from 'react'
import store from '../../../store'
import { VoterContract } from './../../../abi/voterContract'


class VoterRegForm extends Component {
  constructor(props) {
    super(props)
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
  }

  handleChange(event) {
     const target = event.target;
     const value = target.value;
     const name = target.id;

     this.setState({
       [name]: value
     });
 }

  handleSubmit(event) {

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
    const voterCon = web3.eth.contract(VoterContract).at('0x00d3600ce55FaFD5f65Aca64D8b2FaE177bEDA2e');

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
      <form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit}>
          <fieldset>
              <div className="pure-control-group">
                  <label htmlFor="name">Full Name</label>
                  <input id="name" type="text" placeholder="Full Name" onChange={this.handleChange}/>
                  <span className="pure-form-message-inline">This is a required field.</span>
              </div>

              <div className="pure-control-group">
                  <label htmlFor="nic">NIC No</label>
                  <input id="nic" type="text" placeholder="NIC No" onChange={this.handleChange}/>
              </div>

              <div className="pure-control-group">
                  <label htmlFor="secret">Secret</label>
                  <input id="secret" type="text" placeholder="Secret" onChange={this.handleChange}/>
              </div>

              <div className="pure-control-group">
                  <label htmlFor="resecret"> Re Enter Secret</label>
                  <input id="resecret" type="text" placeholder="Re Enter Secret" onChange={this.handleChange}/>
              </div>

              <div className="pure-controls">
                  <label htmlFor="cb" className="pure-checkbox">
                      <input id="cb" type="checkbox"/> I ve read the terms and conditions
                  </label>

                  <button type="submit" className="pure-button pure-button-primary">Submit</button>
              </div>
          </fieldset>
      </form>
    )
  }
}

export default VoterRegForm
