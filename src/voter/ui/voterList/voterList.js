import React, { Component } from 'react'
import { VoterContract } from './../../../abi/voterContract'
import store from '../../../store'
import { Form,Input,Grid, Message,Icon,Card,Image, Loader,Button } from "semantic-ui-react";

class VoterList extends Component {


  constructor(props, { authData }) {
    super(props)
    authData = this.props
    this.queryNumofVoters=this.queryNumofVoters.bind(this)
    this.queryVoterDetails=this.queryVoterDetails.bind(this)
    this.handleChange=this.handleChange.bind(this)

    this.state = {
          voter_id:'',
          name: '',
          nic:'',
          hashofsecret:'',
          submitted_to_review:'',
          to_be_deleted:'',
          to_be_added:'',
          deleted:'',
          verified:'',
          accountstatus:''
      }

      this.state = {
      isVisibleState: false
     }


  }

  componentDidMount() {
   this.queryNumofVoters();
   this.queryVoterDetails();
 }


 handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
}

  queryNumofVoters (){
    let web3 = store.getState().web3.web3Instance
    var voterContractInstance;
    voterContractInstance=web3.eth.contract(VoterContract).at('0xa3a41a74e6b46054f3F01fc9B94DD1ad6DB7CD81')
    const { getNumOfVoters } = voterContractInstance;
    getNumOfVoters((err,num)=>{
      if(err) console.error('An error occured ::', err);
      console.log(num.toNumber());
    })

  }

  queryVoterDetails (event){
      let web3 = store.getState().web3.web3Instance
    var voterContractInstance;
    voterContractInstance=web3.eth.contract(VoterContract).at('0xa3a41a74e6b46054f3F01fc9B94DD1ad6DB7CD81')
    const voterID = this.state.voterid;
    const { getVoter } = voterContractInstance;
    getVoter(voterID,(err,result) => {
      if(err) console.error('An error occured ::', err);
      // console.log(web3.toUtf8(result[3]));
      // console.log(web3.toUtf8(result[1]));
      // console.log(web3.toUtf8(result[2]));

      this.setState({
            name: web3.toAscii(result[0]),
            nic:web3.toAscii(result[1]),
            hashofsecret:result[2],
            submitted_to_review:result[3],
            to_be_deleted:result[4],
            to_be_added:result[5],
            deleted:result[6],
            verified:result[7]

        })

        if ( this.state.deleted ) {
          this.setState({accountstatus:"Account was deleted"});
        }
        else if (this.state.verified) {
          this.setState({accountstatus:"Account was verified"});
        }
        else if (this.state.to_be_deleted || this.state.to_be_added) {
          this.setState({accountstatus:"submitted to review. Pending at District office"});
        }
        else if(this.state.submitted_to_review){
          this.setState({accountstatus:"submitted to review. Pending at grama Niladhari"});
        }
        console.log(this.state)
        if(result[2]!== "0x0000000000000000000000000000000000000000000000000000000000000000"){
          this.setState({ isVisibleState:true })
        }




    })
    //event.preventDefault()
  }

  render(){

    return(
      <Grid celled>
        <Grid.Row>
          <Grid.Column width={7}>
            <Form onSubmit={this.queryVoterDetails.bind(this)}>
              <Form.Group widths="equal">
                  <Input focus label="voter id" placeholder='Search...' name="voterid" onChange={this.handleChange}/>
              </Form.Group>
              <Form.Group inline>
                  <Form.Button primary>Search</Form.Button>
                  <Form.Button>Reset</Form.Button>
                </Form.Group>
           </Form>
          </Grid.Column>
            <Grid.Column width={9}>
            <Message positive>
               <Message.Header>Account Status</Message.Header>
               <p>
                 { this.state.accountstatus }
                   <Loader className={ this.state.isVisibleState ? 'disabled' : 'active' } inline='centered' />
               </p>
             </Message>
              </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={3}>
               <Card.Group>
              <Card>
                 <Image src='/images/avatar/small/prof.png' />
                 <Card.Content>
                   <Card.Header>{ this.state.name }</Card.Header>
                   <Card.Description></Card.Description>
                 </Card.Content>
                 <Card.Content extra>
                   <a>
                     <Icon name='user' />
                     Voter
                   </a>
                 </Card.Content>
               </Card>
              </Card.Group>
          </Grid.Column>
          <Grid.Column width={7}>
          <h3>Voter Details</h3><br/>
               <Card>
                 <Card.Content>
                   <Card.Header>NIC</Card.Header>
                   <Card.Meta></Card.Meta>
                   <Card.Description>{this.state.nic}
                    <Loader className={ this.state.isVisibleState ? 'disabled' : 'active' } inline='centered' />
                   </Card.Description>
                 </Card.Content>
               </Card>
             <Card>
               <Card.Content style={{ 'word-wrap': 'break-word' }}>
                 <Card.Header>Hash of Secret</Card.Header>
                 <Card.Meta></Card.Meta>
                 <Card.Description>{this.state.hashofsecret}
                 <Loader className={ this.state.isVisibleState ? 'disabled' : 'active' } inline='centered' />
                 </Card.Description>
               </Card.Content>
             </Card>
          </Grid.Column>

          <Grid.Column width={6}>
            <h3>Actions</h3>

            <Button positive>To be Added List</Button>
             <Button negative>To be Deleted List</Button>
             <br/><br/><br/>
             <Button positive>Delete</Button>
              <Button negative>Verify</Button>
              <br/><br/><br/>
                <Button primary>View Documents</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }



}

export default VoterList
