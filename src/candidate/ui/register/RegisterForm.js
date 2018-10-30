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
   candidateContractInstance=web3.eth.contract(candidateContract).at('0x5522F5943341f5Ad7DF99dE7d81B64Fb61F52D3a')
   const fullname = this.state.name
   const address= this.state.address
   const nationality = this.state.nationality
   console.log(fullname)
   candidateContractInstance.registerCandidate(fullname,address,nationality,"ABC", (error, txHash) => {
     if (error) { throw error }
     console.log(txHash)
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
             <label htmlFor="address">Address</label>
             <input type="text" name="address" id="address" onChange={this.handleChange} />
            </div>

            <div className="pure-control-group">
             <label htmlFor="nationality">Nationality</label>
             <input type="text"  name="nationality" id="nationality" onChange={this.handleChange} />
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
