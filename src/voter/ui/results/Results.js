import React, { Component } from 'react'
import store from '../../../store'
import { Grid, Segment, Label, Form} from 'semantic-ui-react'
import { candidateContract } from '../../../candidate/ui/register/candidateContract'
import { ElectionContract } from '../../../abi/ElectionContract'
import { Chart } from 'react-charts'

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

 handleAddCandidate = (candidateName,party,votesreceived) => {
   this.setState({ candidates: this.state.candidates.concat([{ name: candidateName, party: party,votes: votesreceived }]) });
 }

 handleVotes = (candidatename,votesreceived) => {
   this.setState({
      votes: this.state.votes.concat([[candidatename, votesreceived]])
    })
   //this.setState({ votes: this.state.votes.concat([{name:candidatename, votecount:votesreceived }])});
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
      // this.handleAddCandidate(web3.toUtf8(result[0]),web3.toUtf8(result[2]))
     //  console.log(web3.toUtf8(result[1]));
     //  console.log(web3.toUtf8(result[2]));
          //get results for valid candidate
          totalVotesFor(i+1,(err,res) => {
             if(err) console.error('An error occured ::', err);
           this.handleVotes(web3.toUtf8(result[0]),res.toNumber())
            this.handleAddCandidate(web3.toUtf8(result[0]),web3.toUtf8(result[2]),res.toNumber())


          });


     })



   }
 })

}

render(){

  var votedata = this.state.votes
  console.log(votedata)
  return(

    <Segment placeholder>
      <Grid columns={2} relaxed='very' stackable>
        <Grid.Column>
             <Form>
                  <h4>Election Results</h4>
                  {this.state.candidates.map((candidate,i) => (
                    <Form.Field key={i}>
                    <Grid columns={4} relaxed='very' stackable>
                      <Grid.Column>
                    <Label as='a' image>
                       <img src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Label>
                    </Grid.Column>
                    <Grid.Column>
                    <Label>
                      {candidate.name}
                    </Label>
                       </Grid.Column>
                      <Grid.Column>
                     <Label>
                     {candidate.party}
                     </Label>
                       </Grid.Column>
                         <Grid.Column>
                     <Label color='red'>
                     {candidate.votes}
                     </Label>
                       </Grid.Column>
                     </Grid>
                    </Form.Field>
                  ))}
              </Form>
        </Grid.Column>
          <Grid.Column>
        <div
          style={{
            width: "400px",
            height: "400px"
          }}
          >
          <Chart
            data={[
              {
                label: "voter 1",
                data: votedata
              }

            ]}
            series={{ type: 'bar' }}
            axes={[
              { primary: true, type: "ordinal", position: "bottom" },
              { type: "linear", position: "left" ,stacked:true}
            ]}
          />
          </div>


        </Grid.Column>

      </Grid>
    </Segment>

  )
}


}

export default Results
