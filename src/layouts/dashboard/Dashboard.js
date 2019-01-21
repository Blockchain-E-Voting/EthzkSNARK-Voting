import React, { Component } from 'react'
import VoterRegForm from '../../voter/ui/voterRegistration/VoterRegForm'
import ElectionCountDown from '../../voter/ui/countDown/ElectionCountDown'
import ResultCountDown from '../../voter/ui/resultCountDown/ResultCountDown'
import RegistrationLayout from '../../voter/ui/registrationLayout/RegistrationLayout'
import { Icon, Step, Grid, Message } from 'semantic-ui-react'
import { VoterContract } from './../../abi/voterContract'
import store from '../../store'

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
    this.state = {
          temp_registered:'',
          name: '',
          nic:'',
          hashofsecret1:'',
          hashofsecret2:'',
          submitted_to_review:'',
          to_be_deleted:'',
          to_be_added:'',
          deleted:'',
          verified:'',
          accountstatus : '',
          voted : '',
          voteid: ''
      }
    this.changeuistage2 = this.changeuistage2.bind(this);
    this.changeuistage5 = this.changeuistage5.bind(this);
  }

  componentDidMount() {
   this.getuserData();
 }



 getuserData(event){
   let web3 = store.getState().web3.web3Instance
   var voterContractInstance;
   voterContractInstance=web3.eth.contract(VoterContract).at('0x61A298ef4F03a31824B320A4Fa42Dc86184DE3Be')
   const voterID = this.props.authData.id
   const { getVoter } = voterContractInstance;
   getVoter(voterID,(err,result) => {
     if(err) console.error('An error occured ::', err);

     this.setState({
           name: web3.toAscii(result[0]),
           nic:web3.toAscii(result[1]),
           hashofsecret1:result[2].toString(),
           hashofsecret2:result[3].toString(),
           submitted_to_review:result[4],
           to_be_deleted:result[5],
           to_be_added:result[6],
           deleted:result[7],
           verified:result[8],
           temp_registered:result[9],
           voted:result[10]

       })


               if ( this.state.deleted ) {
                 this.setState({
                   accountstatus:"Your Voting Account has been deleted. Meet the Grama Nildhari",
                   stage1:false, stage2:false,stage3:false,stage4:false,stage5:false
                 });
               }
               else if( this.state.voted ){
                 this.setState({
                   accountstatus:"Your voting has been casted correctly. Wait for the results",
                   stage1:false, stage2:false,stage3:false,stage4:false,stage5:true
                 });
               }
               else if (this.state.verified) {
                 this.setState({
                   accountstatus:"Your Voting Account has been verified. wait for the election to start",
                   stage1:false, stage2:false,stage3:false,stage4:true,stage5:false
                 });
               }
               else if (this.state.to_be_deleted || this.state.to_be_added) {
                 this.setState({
                   accountstatus:"submitted to review. Pending at District office",
                   stage1:false, stage2:false,stage3:true,stage4:false,stage5:false
                 });
               }
               else if(this.state.submitted_to_review){
                 this.setState({
                   accountstatus:"Your request was submitted to review and It is pending at Grama Niladhari. Please prepare the valid documents. ex: NIC, Birth Certificate etc.",
                   stage1:false, stage2:true,stage3:false,stage4:false,stage5:false
                 });
               }
               else if(this.state.temp_registered){
                 this.setState({
                   accountstatus:"Your account has been reset.Please fill the registration form again",
                   stage1:true, stage2:false,stage3:false,stage4:false,stage5:false
                 });
               }
               else if(result[2].toString() === "0" && result[3].toString()=== "0"){
                 this.setState({
                   accountstatus:"Register for the election by filling out below form",
                   stage1:true, stage2:false,stage3:false,stage4:false,stage5:false
                 });
               }

      // console.log(result)

     })

 }


 changeuistage2(){
   this.setState({
     accountstatus:"Your request was submitted to review and It is pending at Grama Niladhari. Please prepare the valid documents. ex: NIC, Birth Certificate etc.",
     stage1:false, stage2:true,stage3:false,stage4:false,stage5:false
   });
 }

 changeuistage5(txhash){
   this.setState({voteid:txhash})
   this.setState({
     accountstatus:"Your voting has been casted correctly. Wait for the results",
     stage1:false, stage2:false,stage3:false,stage4:false,stage5:true
   });
   //console.log("working")
   //console.log(txhash)

 }

  render() {

   // console.log(this.props.authData);
   let content;
   if(this.state.stage1){
     content=  <RegistrationLayout onClicktoGrama={this.changeuistage2}/>
   }else if(this.state.stage2){
     content = '';
   }else if(this.state.stage4){
     content= <ElectionCountDown changeToResultUi={this.changeuistage5}/>
   }else if(this.state.stage5){
     content= <ResultCountDown voteId={ this.state.voteid }/>
   }

    return(
      <Grid celled>
       <Grid.Row>
        <Grid.Column width={16}>
        <Step.Group>
          <Step className={this.state.stage1? "active" : "disabled"}>
            <Icon name='file alternate outline' />
            <Step.Content>
              <Step.Title>Apply</Step.Title>
              <Step.Description>Apply for the election</Step.Description>
            </Step.Content>
          </Step>

          <Step className={this.state.stage2? "active" : "disabled"}>
            <Icon name='id badge' />
            <Step.Content>
              <Step.Title>Pending</Step.Title>
              <Step.Description>Pending at grama Niladari</Step.Description>
            </Step.Content>
          </Step>

          <Step className={this.state.stage3? "active" : "disabled"}>
            <Icon name='id card' />
            <Step.Content>
              <Step.Title>Pending</Step.Title>
              <Step.Description>Pending at District office</Step.Description>
            </Step.Content>
          </Step>

          <Step className={this.state.stage4? "active" : "disabled"}>
            <Icon name='envelope outline' />
            <Step.Content>
              <Step.Title>Voting</Step.Title>
              <Step.Description>Vote for Candidate</Step.Description>
            </Step.Content>
          </Step>

          <Step className={this.state.stage5? "active" : "disabled"}>
            <Icon name='clipboard list' />
            <Step.Content>
              <Step.Title>Results</Step.Title>
              <Step.Description>View final Result</Step.Description>
            </Step.Content>
          </Step>

        </Step.Group>
         </Grid.Column>
        </Grid.Row>

        <Grid.Row>
         <Grid.Column width={16}>

            <p><strong>Congratulations {this.props.authData.name}!</strong> </p>
            <Message info>
             <p> { this.state.accountstatus }</p>
           </Message>
            {content}
            </Grid.Column>
          </Grid.Row>
        </Grid>
    )
  }
}

export default Dashboard
