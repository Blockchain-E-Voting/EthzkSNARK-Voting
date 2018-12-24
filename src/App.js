import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'
import { Menu } from 'semantic-ui-react'

// UI Components
import LoginButtonContainer from './user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import './css/styles.global.css'

class App extends Component {
  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <Menu inverted>
        <Menu.Item as={Link}  name='dashboard'  to="/dashboard" />
        <Menu.Item as={Link}  name='profile'  to="/profile" />
        <Menu.Item as={Link}  name='Voters'  to="/voter/list" />
        <Menu.Item as={Link}  name='Candidate List'  to="/candidate/list" />
        <Menu.Item as={Link}  name='Candidate Register'  to="/candidate/register" />
        <Menu.Item as={Link}  name='Adminr'  to="/admin" />
        <LogoutButtonContainer />
      </Menu>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
        <Menu inverted>
         <Menu.Item as={Link}  name='signup'  to="/signup" />
        <LoginButtonContainer />
       </Menu>
    )

    return (
      <div className="App">

            <OnlyGuestLinks />
            <OnlyAuthLinks />


        {this.props.children}
      </div>
    );
  }
}

export default App
