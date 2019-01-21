import React, { Component } from 'react'
import { Image, Input, Header,Grid,Button, Message,Table, Container } from 'semantic-ui-react'

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
    <Container>
    <br/><br/>
    <Table basic='very'>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Contract</Table.HeaderCell>
          <Table.HeaderCell>Contract address</Table.HeaderCell>
          <Table.HeaderCell>Link</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>Authentication</Table.Cell>
          <Table.Cell>0x63b777d68B47A201ecE2c1D240d580f3e6d22074</Table.Cell>
          <Table.Cell><a href="https://rinkeby.etherscan.io/address/0x63b777d68B47A201ecE2c1D240d580f3e6d22074">View</a></Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Candidate</Table.Cell>
          <Table.Cell>0x8B74F1C1235f2dC2821338bcA739cD70306D394F</Table.Cell>
          <Table.Cell><a href="https://rinkeby.etherscan.io/address/0x8B74F1C1235f2dC2821338bcA739cD70306D394F">View</a></Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Voter</Table.Cell>
          <Table.Cell>0x61A298ef4F03a31824B320A4Fa42Dc86184DE3Be</Table.Cell>
          <Table.Cell><a href="https://rinkeby.etherscan.io/address/0x61a298ef4f03a31824b320a4fa42dc86184de3be">View</a></Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Election</Table.Cell>
          <Table.Cell>0xB0110635A904588BaCC1DA6Ac1c8dd651f323864</Table.Cell>
          <Table.Cell><a href="https://rinkeby.etherscan.io/address/0xB0110635A904588BaCC1DA6Ac1c8dd651f323864">View</a></Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Verifier</Table.Cell>
          <Table.Cell>0x3e8012DD6e54D42BB386eeB83375a53bB47B067D</Table.Cell>
          <Table.Cell><a href="https://rinkeby.etherscan.io/address/0x3e8012DD6e54D42BB386eeB83375a53bB47B067D">View</a></Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
    </Container>
      </main>


      </div>
    )
  }
}



export default Home
