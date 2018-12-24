import React, { Component } from 'react'
import { candidateContract } from './candidateContract'
import store from '../../../store'

class RegisterForm extends Component {


  constructor(props, { authData }) {
    super(props)
    authData = this.props
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)

  }

  handleChange(event) {
     const target = event.target;
     const value = target.value;
     const name = target.name;

     this.setState({
       [name]: value
     });
 }

 handleSubmit(event) {
   let web3 = store.getState().web3.web3Instance
   var candidateContractInstance;
   candidateContractInstance=web3.eth.contract(candidateContract).at('0x8B74F1C1235f2dC2821338bcA739cD70306D394F')
   const fullname = this.state.name
   const nic= this.state.nic
   const party = this.state.party
   console.log(fullname)
   web3.eth.getCoinbase((error, coinbase) => {
     // Log errors, if any.
     if (error) {
       console.error(error);
     }
       candidateContractInstance.addCandidate(fullname,nic,party,{from: coinbase}, (error, txHash) => {
         if (error) { throw error }
         console.log(txHash)
       })
     })

   event.preventDefault()

 }

  render(){
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
          <br/><br/>
          <h1>Candidate Register</h1>

          <form onSubmit={this.handleSubmit}  className="pure-form pure-form-aligned">
           <fieldset>

            <div className="pure-control-group">
             <label htmlFor="name">Full Name:</label>
             <input type="text" name="name" id="name" onChange={this.handleChange} />
              <span className="pure-form-message-inline">This is a required field.</span>
            </div>

            <div className="pure-control-group">
             <label htmlFor="nic">NIC</label>
             <input type="text" name="nic" id="nic" onChange={this.handleChange} />
            </div>

            <div className="pure-control-group">
             <label htmlFor="party">Party</label>
             <input type="text"  name="party" id="party" onChange={this.handleChange} />
            </div>

            <div className="pure-controls">
            <input type="submit" value="register" className="pure-button pure-button-primary"/>
            </div>

            </fieldset>
          </form>

        </div>
        </div>
      </main>
    )
  }

}

export default RegisterForm
