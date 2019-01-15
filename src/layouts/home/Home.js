import React, { Component } from 'react'
import { Image, Input, Header,Grid,Button, Message } from 'semantic-ui-react'

class Home extends Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.state = {value:'',showMessage:false, resultMessage:''}
  }


  handleChange(e) {
      this.setState({ value: e.target.value });
   }

   keyPress(e){
     if(e.keyCode == 13){
        //console.log('value', e.target.value);
        var ethaddress = this.state.value;
        fetch("https://api-rinkeby.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash="+ethaddress+"&apikey=ESH7625QANSBPB5KJ1C9IIFKRRV1S1SHD9")
        .then(results => results.json())
        .then(res => {
          var status = res.status;
          console.log(status)
          this.setState({ showMessage: true });
          if(status == 1){
            this.setState({ resultMessage: 'Your vote has  been casted correctly'})
          }else if(status == 0){
              this.setState({ resultMessage: 'Your vote has not been casted correctly'})
          }
        })
        // put the login here
     }
  }

  render() {
    const pstyle = {
      color:"#603131"
    };

    const { open, size } = this.state

    return(
      <div>

      <main className="container">
      <Message positive style={{display: this.state.showMessage ? 'block' : 'none' }}>
       <Message.Header>{ this.state.resultMessage  }</Message.Header>
       <p>
         Go to your <b>Dashboard</b> to see the final result.
       </p>
     </Message>

      <div>
       <Header as='h2' icon textAlign='center'>

         <Header.Content>Electronic Voting System</Header.Content>
       </Header>
       <Image centered size='small' src='/images/voting/voting.png' />
     </div>
     <br/>

     <Grid columns={3}>
      <Grid.Row>
        <Grid.Column>

        </Grid.Column>
        <Grid.Column>
         <Input size="big" fluid icon='search' placeholder='Transaction Id...' onKeyDown={this.keyPress} onChange={this.handleChange} />
         <p style={pstyle}>Verify your vote by entering transaction id</p>
         <br/>
         <Button active>Sign In</Button>&nbsp;&nbsp;&nbsp;&nbsp;
         <Button active>Register</Button>
        </Grid.Column>
        <Grid.Column>

        </Grid.Column>
      </Grid.Row>
    </Grid>

      </main>


      </div>
    )
  }
}



export default Home
