import React, { Component } from 'react'
import { candidateContract } from './../register/candidateContract'
import store from '../../../store'
import { Button,  Divider, Checkbox, Label, Form,Grid, Segment, Input, Icon } from "semantic-ui-react";

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
          party:'',
          candidates:[],
      }


  }

  componentDidMount() {
   this.queryNumofCandidates();
   //this.queryCandidateDetails();
 }


 handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
}

  handleAddCandidate = (candidateName,party) => {
   this.setState({ candidates: this.state.candidates.concat([{ name: candidateName, party: party }]) });
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
        this.handleAddCandidate(web3.toUtf8(result[0]),web3.toUtf8(result[2]))
      //  console.log(web3.toUtf8(result[1]));
      //  console.log(web3.toUtf8(result[2]));

      })

    }
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
      <Segment placeholder>
      <Grid columns={2} relaxed='very' stackable>
      <Grid.Column>
           <Form>
                <h4>Candidates</h4>
                {this.state.candidates.map((candidate,i) => (
                  <Form.Field key={i}>
                  <Label as='a' image>
                     <img src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                     {candidate.name}
                   </Label>
                   <Label>
                   {candidate.party}
                   </Label>
                  </Form.Field>
                ))}
            </Form>
      </Grid.Column>



      <Grid.Column verticalAlign='middle'>
              <h3>Candidate Search</h3>
              <Form className="pure-form" onSubmit={this.queryCandidateDetails}>
                <fieldset>
                    <legend>Candidate Details</legend>
                    <Input icon placeholder='Search...' name="candidateid" onChange={this.handleChange}>
                      <input />
                      <Icon name='search' />
                    </Input>
                    <Button type="submit" className="pure-button pure-button-primary">Search</Button>
                </fieldset>
            </Form>
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
          </Grid.Column>
          </Grid>
          <Divider vertical>Or</Divider>
        </Segment>
    )
  }



}

export default CandidateList
