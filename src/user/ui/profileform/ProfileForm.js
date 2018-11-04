import React, { Component } from 'react'
import { Card, Icon, Image,Grid, Button,Input } from 'semantic-ui-react'

class ProfileForm extends Component {
  constructor(props,{authData}) {
    super(props)
    this.state = {
      name: this.props.name,
      id: this.props.id
    }

  }

  onInputChange(event) {
    this.setState({ name: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.name.length < 2)
    {
      return alert('Please fill in your name.')
    }

    this.props.onProfileFormSubmit(this.state.name)
  }

  render() {
    return(
        <Grid celled>
         <Grid.Row>
          <Grid.Column width={3}>
            <Card>
                <Image src='/images/avatar/large/matthew.png' />
                <Card.Content>
                  <Card.Header>{this.state.name}</Card.Header>
                  <Card.Meta>
                    <span className='date'>Joined in 2015</span>
                  </Card.Meta>
                  <Card.Description>Matthew is a musician living in Nashville.</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='user' />
                    22 Friends
                  </a>
                </Card.Content>
              </Card>
         </Grid.Column>

         <Grid.Column width={7}>
            <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
              <fieldset>
                <label htmlFor="name">Name</label>
                <Input id="name" type="text" value={this.state.name} onChange={this.onInputChange.bind(this)} placeholder="Name" />
                <span className="pure-form-message">This is a required field.</span>
                <br />
                <Button.Group>
                  <Button>Cancel</Button>
                  <Button.Or />
                  <Button positive type="submit">Save</Button>
                </Button.Group>
              </fieldset>
            </form>
          </Grid.Column>

          <Grid.Column width={6}>
          <h2>User Identity</h2><br/>
              { this.state.id }
          </Grid.Column>

         </Grid.Row>
         </Grid>
    )
  }
}

export default ProfileForm
