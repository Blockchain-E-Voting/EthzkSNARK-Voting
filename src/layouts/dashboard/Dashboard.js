import React, { Component } from 'react'
import VoterRegForm from '../../voter/ui/voterRegistration/VoterRegForm'
import { Icon, Step, Grid } from 'semantic-ui-react'

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }


  render() {
    return(
      <Grid celled>
       <Grid.Row>
        <Grid.Column width={16}>
        <Step.Group>
          <Step>
            <Icon name='file alternate outline' />
            <Step.Content>
              <Step.Title>Apply</Step.Title>
              <Step.Description>Apply for the election</Step.Description>
            </Step.Content>
          </Step>

          <Step active>
            <Icon name='id badge' />
            <Step.Content>
              <Step.Title>Pending</Step.Title>
              <Step.Description>Pending at grama Niladari</Step.Description>
            </Step.Content>
          </Step>

          <Step disabled>
            <Icon name='id card' />
            <Step.Content>
              <Step.Title>Pending</Step.Title>
              <Step.Description>Pending at District officei</Step.Description>
            </Step.Content>
          </Step>

          <Step>
            <Icon name='envelope outline' />
            <Step.Content>
              <Step.Title>Voting</Step.Title>
              <Step.Description>Vote for Candidate</Step.Description>
            </Step.Content>
          </Step>

          <Step>
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
            <VoterRegForm/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    )
  }
}

export default Dashboard
