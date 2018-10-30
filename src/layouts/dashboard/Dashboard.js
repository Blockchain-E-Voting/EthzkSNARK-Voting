import React, { Component } from 'react'
import VoterRegForm from '../../voter/ui/voterRegistration/VoterRegForm'
import VoterList from '../../voter/ui/voterList/voterList'

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Dashboard</h1>
            <p><strong>Congratulations {this.props.authData.name}!</strong> </p>
            <VoterRegForm/>

          </div>
          <div className="pure-u-1-1">
            <VoterList/>
            </div>
        </div>



      </main>
    )
  }
}

export default Dashboard
