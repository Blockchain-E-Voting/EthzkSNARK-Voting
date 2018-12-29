import React, { Component } from 'react'
import { VoterContract } from './../../../abi/voterContract'
import store from '../../../store'
import { Form,Input,Grid,Icon,Card,Image, Loader,Button } from "semantic-ui-react";

class VoterList extends Component {


  constructor(props, { authData }) {
    super(props)
    authData = this.props
    this.queryNumofVoters=this.queryNumofVoters.bind(this)
    this.queryVoterDetails=this.queryVoterDetails.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.to_be_added_list=this.to_be_added_list.bind(this)
    this.to_be_deleted_list=this.to_be_deleted_list.bind(this)
    this.deleteVoter=this.deleteVoter.bind(this)
    this.verifyVoter=this.verifyVoter.bind(this)
    this.resetVoter=this.resetVoter.bind(this)

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
          voted:'',
          accountstatus:'',
          is_grid_visible:false

      }

      this.state = {
      isVisibleState: false
     }

     this.web3 = store.getState().web3.web3Instance
     //let voterContractInstance;
     this.voterContractInstance=this.web3.eth.contract(VoterContract).at('0xE35fD0447c71c701b7157173c50c1778CcfdD822')


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

    const { getNumOfVoters } = this.voterContractInstance;
    getNumOfVoters((err,num)=>{
      if(err) console.error('An error occured ::', err);
      console.log(num.toNumber());
    })

  }

  clearGrid(event){
    this.setState({ is_grid_visible:false });
  }

  queryVoterDetails (event){

    const voterID = this.state.voterid;
    const { getVoter } = this.voterContractInstance;
    getVoter(voterID,(err,result) => {
      if(err) console.error('An error occured ::', err);
      // console.log(web3.toUtf8(result[3]));
      // console.log(web3.toUtf8(result[1]));
      // console.log(web3.toUtf8(result[2]));

      this.setState({
            name: this.web3.toAscii(result[0]),
            nic:this.web3.toAscii(result[1]),
            hashofsecret:result[2],
            submitted_to_review:result[3],
            to_be_deleted:result[4],
            to_be_added:result[5],
            deleted:result[6],
            verified:result[7],
            temp_registered:result[8],
            voted:result[9]
        })

        if ( this.state.deleted ) {
          this.setState({accountstatus:"Account was deleted"});
        }
        else if(this.state.voted){
          this.setState({accountstatus:"Voted"});
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
        else if(this.state.temp_registered){
          this.setState({accountstatus:"This account has been reset."})
        }
        //console.log(this.state)
        if(result[2]!== "0x0000000000000000000000000000000000000000000000000000000000000000"){
          this.setState({ isVisibleState:true, is_grid_visible:true })
        }




    })
    //event.preventDefault()
  }


  to_be_added_list(){
    this.web3.eth.getCoinbase((error, coinbase) => {
      // Log errors, if any.
      if (error) {
        console.error(error);
      }

      this.voterContractInstance.toBeAdded(this.state.voterid, {from: coinbase},function(err,result){
        // If no error, update user.
          if(err){
            console.log(err)
          }

      })

    })

  }

  to_be_deleted_list(){
    this.web3.eth.getCoinbase((error, coinbase) => {
      // Log errors, if any.
      if (error) {
        console.error(error);
      }

      this.voterContractInstance.toBeDeleted(this.state.voterid, {from: coinbase},function(err,result){
        // If no error, update user.
          if(err){
            console.log(err)
          }

      })

    })
  }

  deleteVoter(){
    this.web3.eth.getCoinbase((error, coinbase) => {
      // Log errors, if any.
      if (error) {
        console.error(error);
      }

      this.voterContractInstance.deleted(this.state.voterid, {from: coinbase},function(err,result){
        // If no error, update user.
          if(err){
            console.log(err)
          }

      })

    })
  }

  verifyVoter(){
    this.web3.eth.getCoinbase((error, coinbase) => {
      // Log errors, if any.
      if (error) {
        console.error(error);
      }

      this.voterContractInstance.verified(this.state.voterid, {from: coinbase},function(err,result){
        // If no error, update user.
          if(err){
            console.log(err)
          }

      })

    })
  }

  resetVoter(){
    this.web3.eth.getCoinbase((error, coinbase) => {
      // Log errors, if any.
      if (error) {
        console.error(error);
      }

      this.voterContractInstance.reset(this.state.voterid, {from: coinbase},function(err,result){
        // If no error, update user.
          if(err){
            console.log(err)
          }

      })

    })
  }

  render(){

    return(
      <div>

    <Form>
      <Form.Group widths="equal">
          <Input focus label="voter id" placeholder='Search...' name="voterid" onChange={this.handleChange}/>
      </Form.Group>
      <Form.Group inline>
          <Form.Button onClick={this.queryVoterDetails.bind(this)} primary>Search</Form.Button>
          <Form.Button onClick={this.clearGrid.bind(this)}>Reset</Form.Button>
        </Form.Group>
   </Form>


      <br/><br/>
      <Grid celled className={this.state.is_grid_visible? "visible" : "hidden"}>
        <Grid.Row>
          <Grid.Column width={3}>
               <Card.Group>
              <Card>
                 <Image src='/images/avatar/small/user.jpeg' />
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

            <h5>Account status</h5>
                 { this.state.accountstatus }
                   <Loader className={ this.state.isVisibleState ? 'disabled' : 'active' } inline='centered' />

            <h5>NIC</h5>
            {this.state.nic}
            <Loader className={ this.state.isVisibleState ? 'disabled' : 'active' } inline='centered' />
            <h5>Hash of Secret</h5>
            {this.state.hashofsecret}
           <Loader className={ this.state.isVisibleState ? 'disabled' : 'active' } inline='centered' />
          </Grid.Column>
          <Grid.Column width={6}>
            <h3>Actions</h3>
            <Form>
             <Form.Field>
               <label>Identity</label>
               <input  value={this.state.voterid} />
             </Form.Field>
            </Form>
            <br/>
            <Button positive onClick={this.to_be_added_list}>To be Added List</Button>
             <Button negative onClick={this.to_be_deleted_list}>To be Deleted List</Button>
             <br/><br/><br/>
             <Button positive onClick={this.deleteVoter}>Delete</Button>
              <Button negative onClick={this.verifyVoter}>Verify</Button>
              <Button negative onClick={this.resetVoter}>Reset</Button>
              <br/><br/><br/>
                <Button primary>View Documents</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </div>
    )
  }



}

export default VoterList
