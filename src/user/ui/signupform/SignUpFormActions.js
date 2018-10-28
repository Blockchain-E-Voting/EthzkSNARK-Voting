import AuthenticationContract from '../../../../build/contracts/Authentication.json'
import { loginUser } from '../loginbutton/LoginButtonActions'
import store from '../../../store'

// const contract = require('truffle-contract')

export function signUpUser(name) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      //const authentication = contract(AuthenticationContract)
      const authentication = web3.eth.contract(AuthenticationContract).at('0x63b777d68B47A201ecE2c1D240d580f3e6d22074')
    //  authentication.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var authenticationInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }


          authenticationInstance = authentication

          // Attempt to sign up user.
          authenticationInstance.signup(name, {from: coinbase},function(result){
            return dispatch(loginUser())
          })

      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
