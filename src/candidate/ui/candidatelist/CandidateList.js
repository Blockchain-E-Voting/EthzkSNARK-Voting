import React, { Component } from 'react'
import { candidateContract } from './../register/candidateContract'
import store from '../../../store'

class CandidateList extends Component {


  constructor(props, { authData }) {
    super(props)
    authData = this.props
    this.queryNumofCandidates=this.queryNumofCandidates.bind(this)
    this.queryCandidateDetails=this.queryCandidateDetails.bind(this)
    this.handleChange=this.handleChange.bind(this)

    this.state = {
          name: '',
          nic:'',
          party:''
      }


  }

  componentDidMount() {
   this.queryNumofCandidates();
   this.queryCandidateDetails();
 }


 handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
}

  queryNumofCandidates (){
    let web3 = store.getState().web3.web3Instance
    var candidateContractInstance;
    candidateContractInstance=web3.eth.contract(candidateContract).at('0x8B74F1C1235f2dC2821338bcA739cD70306D394F')
    const { getNumOfCandidates } = candidateContractInstance;
    getNumOfCandidates((err,num)=>{
      if(err) console.error('An error occured ::', err);
      //console.log(num.toNumber());
    })

  }

  queryCandidateDetails (event){
      let web3 = store.getState().web3.web3Instance
    var candidateContractInstance;
    candidateContractInstance=web3.eth.contract(candidateContract).at('0x8B74F1C1235f2dC2821338bcA739cD70306D394F')
    const candidateID = this.state.candidateid;
    console.log(candidateID)
    const { getCandidate } = candidateContractInstance;
    getCandidate(candidateID,(err,result) => {
      if(err) console.error('An error occured ::', err);
      // console.log(web3.toUtf8(result[3]));
      // console.log(web3.toUtf8(result[1]));
      // console.log(web3.toUtf8(result[2]));
      // console.log(web3.toUtf8(result[1]))

      this.setState({
            name: web3.toUtf8(result[0]),
            nic:web3.toUtf8(result[1]),
            party:web3.toUtf8(result[2])
        })

    })
    event.preventDefault()
  }

  render(){
    return(
      <main className="container">
          <div className="pure-g">
           <div className="pure-u-1-3"><p>&nbsp;</p></div>
          </div>
        <div className="pure-g">



            <div className="pure-u-12-24"><h3>Candidate List</h3></div>
            <div className="pure-u-12-24">
              <h3>Candidate Search</h3>
              <form className="pure-form" onSubmit={this.queryCandidateDetails}>
                <fieldset>
                    <legend>Candidate Details</legend>
                    <input type="text" placeholder="candidateid" name="candidateid" onChange={this.handleChange}/>
                    <button type="submit" className="pure-button pure-button-primary">Search</button>
                </fieldset>
            </form>
            <p>
            <strong>Name</strong><br />
             {this.state.name}
           </p>

           <p>
             <strong>NIC</strong><br />
             {this.state.nic}
           </p>


           <p>
             <strong>Party</strong><br />
             {this.state.party}
           </p>
            </div>


        </div>
      </main>
    )
  }



}

export default CandidateList
