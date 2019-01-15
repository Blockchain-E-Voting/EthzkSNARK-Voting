import React, { Component } from 'react'
import store from '../../../store'
import { Image, Reveal,Button,Divider, Grid, Header, Icon, Search, Segment } from "semantic-ui-react";
import PassPhrase from '../passPhrase/PassPhrase'
import VoterRegForm from '../voterRegistration/VoterRegForm'

class RegistrationLayout extends Component {

  constructor(props){
    super(props)
    this.state = {
          uistate:1,
      }
    this.changeuistateto2=this.changeuistateto2.bind(this)
    this.changeuistateto3=this.changeuistateto3.bind(this)
  }

  changeuistateto2(){
    this.setState({uistate:2})
  }

  changeuistateto3(){
    this.setState({uistate:3})
  }

render(){
  let regcontent

  if(this.state.uistate==1){
    regcontent=<Segment placeholder>
    <Grid columns={2} stackable textAlign='center'>
      <Divider vertical><Icon name='arrow alternate circle right' /></Divider>

      <Grid.Row verticalAlign='middle'>
      <Grid.Column>
        <Header icon>
          Once You click Register You must never go back
        </Header>
      </Grid.Column>
        <Grid.Column>
          <Header icon>
            <Icon name='address card outline' />
            Apply For the General Election
          </Header>
          <Button  onClick={this.changeuistateto2}>Regster</Button>
        </Grid.Column>

      </Grid.Row>
    </Grid>
  </Segment>


  }else if(this.state.uistate==2){
    regcontent=<PassPhrase onClickNext={this.changeuistateto3}/>
  }else if(this.state.uistate==3){
    regcontent=<VoterRegForm onClickNextUi={this.props.onClicktoGrama}/>
  }


      return(
        <div>{regcontent}</div>


      )
  }

}
export default RegistrationLayout;
