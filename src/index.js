import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './util/wrappers.js'
import getWeb3 from './util/web3/getWeb3'


// Layouts
import App from './App'
import Home from './layouts/home/Home'
import Dashboard from './layouts/dashboard/Dashboard'
import AdminDashLayout from './layouts/adminDashboard/Dashboard'
import SignUp from './user/layouts/signup/SignUp'
import Profile from './user/layouts/profile/Profile'
import CandidateList from './candidate/ui/candidatelist/CandidateList'
import RegisterForm from './candidate/ui/register/RegisterForm'
import VoterList from './voter/ui/voterList/voterList'

// Redux Store
import store from './store'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

// Initialize web3 and set in Redux.
getWeb3
.then(results => {
  console.log('Web3 initialized!')
})
.catch(() => {
  console.log('Error in web3 initialization.')
})

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="dashboard" component={UserIsAuthenticated(Dashboard)} />
          <Route path="signup" component={UserIsNotAuthenticated(SignUp)} />
          <Route path="profile" component={UserIsAuthenticated(Profile)} />
          <Route path="candidate/list" component={UserIsAuthenticated(CandidateList)} />
          <Route path="candidate/register" component={UserIsAuthenticated(RegisterForm)} />
          <Route path="voter/list" component={UserIsAuthenticated(VoterList)} />
          <Route path="admin" component={UserIsAuthenticated(AdminDashLayout)} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)
