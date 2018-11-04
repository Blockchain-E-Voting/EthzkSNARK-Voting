import AuthenticationContract from '../../../../build/contracts/Authentication.json'
import { browserHistory } from 'react-router'
import store from '../../../store'

// const contract = require('truffle-contract')

export const USER_LOGGED_IN = 'USER_LOGGED_IN'
function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

export function loginUser() {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      //const authentication = contract(AuthenticationContract)
      const authentication = web3.eth.contract(AuthenticationContract).at('0x63b777d68B47A201ecE2c1D240d580f3e6d22074')
      //authentication.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var authenticationInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }


          authenticationInstance = authentication

          // Attempt to login user.
          authenticationInstance.login({from: coinbase},function(err,result){

              if(result){
                    //  console.log(coinbase);
                      // If no error, login user.
                      var userName = web3.toAscii(result)

                      dispatch(userLoggedIn({"name": userName,"id":coinbase}))

                      // Used a manual redirect here as opposed to a wrapper.
                      // This way, once logged in a user can still access the home page.
                      var currentLocation = browserHistory.getCurrentLocation()

                      if ('redirect' in currentLocation.query)
                      {
                        return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
                      }

                      return browserHistory.push('/dashboard')
              }
              else{
                // If error, go to signup page.
                  console.error('Wallet ' + coinbase + ' does not have an account!')
                  return browserHistory.push('/signup')

              }
          })


      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
