import React, { Component } from 'react'
import { VoterContract } from './../../../abi/voterContract'
import store from '../../../store'
import { Form,Input,Grid,Icon,Card,Image, Loader,Button, Container, Dimmer, Message } from "semantic-ui-react";

class VoterList extends Component {


  constructor(props, { authData }) {
    super(props)
    authData = this.props
    this.getTransactionReceiptMined=this.getTransactionReceiptMined.bind(this)
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
          hashofsecret1:'',
          hashofsecret2:'',
          submitted_to_review:'',
          to_be_deleted:'',
          to_be_added:'',
          deleted:'',
          verified:'',
          voted:'',
          accountstatus:'',
          is_grid_visible:false,
          loaderstate:false,
          is_resetmessage_visible:false,
          is_acceptmessage_visible:false,
          is_tobeacceptmessage_visible:false

      }

      this.state = {
      isVisibleState: false
     }

     this.web3 = store.getState().web3.web3Instance
     //let voterContractInstance;
     this.voterContractInstance=this.web3.eth.contract(VoterContract).at('0x61A298ef4F03a31824B320A4Fa42Dc86184DE3Be')


  }

  componentDidMount() {
   this.queryNumofVoters();
   this.queryVoterDetails();
 }

 getTransactionReceiptMined = function getTransactionReceiptMined(txHash, interval) {
     const self = this;
      let web3 = store.getState().web3.web3Instance;
     const transactionReceiptAsync = function(resolve, reject) {
         web3.eth.getTransactionReceipt(txHash, (error, receipt) => {
             if (error) {
                 reject(error);
             } else if (receipt == null) {
                 setTimeout(
                     () => transactionReceiptAsync(resolve, reject),
                     interval ? interval : 500);
             } else {
                 resolve(receipt);
             }
         });
     };

     if (Array.isArray(txHash)) {
         return Promise.all(txHash.map(
             oneTxHash => self.getTransactionReceiptMined(oneTxHash, interval)));
     } else if (typeof txHash === "string") {
         return new Promise(transactionReceiptAsync);
     } else {
         throw new Error("Invalid Type: " + txHash);
     }
 };


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
    this.setState({is_resetmessage_visible:false, is_acceptmessage_visible:false, is_tobeacceptmessage_visible:false});
  }

  queryVoterDetails (event){
    this.setState({is_resetmessage_visible:false, is_acceptmessage_visible:false, is_tobeacceptmessage_visible:false});
    const voterID = this.state.voterid;
    const { getVoter } = this.voterContractInstance;
    getVoter(voterID,(err,result) => {
      if(err) console.error('An error occured ::', err);
      // console.log(web3.toUtf8(result[3]));
      this.setState({
           name: this.web3.toAscii(result[0]),
           nic:this.web3.toAscii(result[1]),
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
       if(result[2].toString()!== "0" || result[3].toString()!== "0"){
         this.setState({ isVisibleState:true, is_grid_visible:true })
       }

    })
    //event.preventDefault()
  }


  to_be_added_list(){
    var txhash;
    var that = this;
    this.web3.eth.getCoinbase((error, coinbase) => {
      // Log errors, if any.
      if (error) {
        console.error(error);
      }

      that.setState({ loaderstate: true});

      this.voterContractInstance.toBeAdded(this.state.voterid, {from: coinbase},function(err,result){
        // If no error, update user.
          if(err){
            console.log(err)
          }
          txhash = result;
          return that.getTransactionReceiptMined(txhash).then(function (receipt) {
          //  console.log(receipt.status);
              if(receipt.status = '0x1'){
                that.setState({ loaderstate: false})
                that.clearGrid()
                that.setState({is_tobeacceptmessage_visible: true})

              }
            });

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
    var txhash;
    var that = this;
    this.web3.eth.getCoinbase((error, coinbase) => {
      // Log errors, if any.
      if (error) {
        console.error(error);
      }
        that.setState({ loaderstate: true })

      this.voterContractInstance.verified(this.state.voterid, {from: coinbase},function(err,result){
        // If no error, update user.
          if(err){
            console.log(err)
          }

          txhash= result;

          return that.getTransactionReceiptMined(txhash).then(function (receipt) {
          //  console.log(receipt.status);
              if(receipt.status = '0x1'){
                that.setState({ loaderstate: false})
                that.clearGrid()
                that.setState({is_acceptmessage_visible: true})

              }
            });

      })

    })
  }

  resetVoter(){
    var txhash;
    var that = this
    this.web3.eth.getCoinbase((error, coinbase) => {
      // Log errors, if any.
      if (error) {
        console.error(error);
      }
      that.setState({ loaderstate: true})

      this.voterContractInstance.reset(this.state.voterid, {from: coinbase},function(err,result){
        // If no error, update user.
          if(err){
            console.log(err)
          }
          txhash = result;

          return that.getTransactionReceiptMined(txhash).then(function (receipt) {
          //  console.log(receipt.status);
              if(receipt.status = '0x1'){
                that.setState({ loaderstate: false})
                that.clearGrid()
                that.setState({is_resetmessage_visible: true})

              }
            });

      })

    })
  }

  render(){

    return(
      <div>
      <Container>
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={6}>
          <Form>
            <Form.Group widths="equal">
                <Input focus label="voter id" placeholder='Search...' name="voterid" onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group inline>
                <Form.Button onClick={this.queryVoterDetails.bind(this)} primary>Search</Form.Button>
                <Form.Button onClick={this.clearGrid.bind(this)}>Reset</Form.Button>
              </Form.Group>
         </Form>
             </Grid.Column>
         </Grid.Row>
     </Grid>

     <Message className={this.state.is_resetmessage_visible? "visible" : "hidden"}
        success
        header='The account was reset successfully'
        content='Now the account owner is able to register for the election again'
      />

      <Message className={this.state.is_tobeacceptmessage_visible? "visible" : "hidden"}
         success
         header='The account was added to to be accepted list'
         content='sent to district office for further review'
       />

       <Message className={this.state.is_acceptmessage_visible? "visible" : "hidden"}
          success
          header='The account was accepted successfully'
          content='Now the account owner is able to vote for the election'
        />

      <Grid celled className={this.state.is_grid_visible? "visible" : "hidden"}>
      <Dimmer active={this.state.loaderstate}  inverted>
       <Loader inverted />
       </Dimmer>
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
            {this.state.hashofsecret1}
            <br/>
            {this.state.hashofsecret2}
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
            <Button  onClick={this.to_be_added_list}>To be Accepted List</Button>
             <Button onClick={this.to_be_deleted_list}>To be Rejected List</Button>
             <br/><br/><br/>
             <Button onClick={this.deleteVoter}>Reject</Button>
              <Button onClick={this.verifyVoter}>Accept</Button>
              <Button  onClick={this.resetVoter}>Reset</Button>
              <br/><br/><br/>
                <Button primary>View Documents</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
        </Container>
      </div>
    )
  }



}

export default VoterList
