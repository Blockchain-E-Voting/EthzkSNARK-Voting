import React, { Component } from 'react'
import store from '../../../store'
import { Grid, Segment, Label, Form} from 'semantic-ui-react'
import { candidateContract } from '../../../candidate/ui/register/candidateContract'
import { ElectionContract } from '../../../abi/ElectionContract'

class Results extends Component {

  constructor(props, { authData }){
    super(props)
    authData = this.props
    this.queryNumofCandidates=this.queryNumofCandidates.bind(this)
    this.handleVotes=this.handleVotes.bind(this)
    this.state = {
          name: '',
          nic:'',
          party:'',
          candidates:[],
          votes:[]
      }
  }

  componentDidMount() {
   this.queryNumofCandidates();
   //this.queryCandidateDetails();
 }

 handleAddCandidate = (candidateName,party) => {
  this.setState({ candidates: this.state.candidates.concat([{ name: candidateName, party: party }]) });
 }

 handleVotes = (votesreceived) => {
   this.setState({ votes: this.state.votes.concat([{ votecount:votesreceived }])});
 }


queryNumofCandidates (){
 let web3 = store.getState().web3.web3Instance
 var candidateContractInstance;
 var ElectioncontractInstance
 candidateContractInstance=web3.eth.contract(candidateContract).at('0x8B74F1C1235f2dC2821338bcA739cD70306D394F')
 ElectioncontractInstance = web3.eth.contract(ElectionContract).at('0xB0110635A904588BaCC1DA6Ac1c8dd651f323864')
 const { getNumOfCandidates } = candidateContractInstance;
 const { totalVotesFor } = ElectioncontractInstance;
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
          //get results for valid candidate
          totalVotesFor(i+1,(err,result) => {
             if(err) console.error('An error occured ::', err);
             this.handleVotes(result.toNumber())

          });


     })



   }
 })

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
        <Grid.Column>
             <Form>
                  <h4>Votes</h4>
                  {this.state.votes.map((votes,i) => (
                    <Form.Field key={i}>
                     <Label>
                     { votes.votecount}
                     </Label>
                    </Form.Field>
                  ))}
              </Form>
        </Grid.Column>
      </Grid>
    </Segment>

  )
}


}

export default Results
