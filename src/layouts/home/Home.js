import React, { Component } from 'react'
import { Image, Input, Header,Grid,Button } from 'semantic-ui-react'

class Home extends Component {
  render() {
    const pstyle = {
      color:"#603131"
    };
    return(
      <main className="container">

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
         <Input size="big" fluid icon='search' placeholder='Transaction Id...' />
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
    )
  }
}

export default Home
