import React, { Component } from 'react'
import store from '../../../store'
import { Image, Reveal,Grid, Button, Checkbox, Label, Form } from "semantic-ui-react";
import { candidateContract } from './../../../candidate/ui/register/candidateContract'

class ElectionForm extends Component {

  constructor(props){
    super(props)
    this.queryNumofCandidates=this.queryNumofCandidates.bind(this)
    this.handleAddCandidate=this.handleAddCandidate.bind(this)
    this.state = {
      name: '',
      candidates: [],
    };

  }

  handleAddCandidate = (candidateName) => {
   this.setState({ candidates: this.state.candidates.concat([{ name: candidateName }]) });
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
          this.handleAddCandidate(web3.toUtf8(result[0]))
        //  console.log(web3.toUtf8(result[1]));
        //  console.log(web3.toUtf8(result[2]));

        })

      }
    })

  }




  componentDidMount() {
   //this.queryCandidateDetails();
   this.queryNumofCandidates();
 }


render(){

  return(

    <Grid columns='two' divided>
   <Grid.Row>
   <Form onSubmit={this.handleSubmit}>

        <h4>Candidates</h4>

        {this.state.candidates.map((candidate,i) => (
          <Form.Field key={i}>
          <Label as='a' image>
             <img src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
             {candidate.name}
           </Label>
            <Checkbox label={candidate.name} />

          </Form.Field>
        ))}
        <Button type="submit"  className="small">Submit</Button>

      </Form>
     <Grid.Column>


     </Grid.Column>
     <Grid.Column>

     </Grid.Column>
  
   </Grid.Row>

   </Grid>




  )
}


}

export default ElectionForm
