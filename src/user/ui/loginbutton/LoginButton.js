import React from 'react'
import { Menu } from 'semantic-ui-react'

const LoginButton = ({ onLoginUserClick }) => {

  return(
    <Menu.Item  name='login'  onClick={(event) => onLoginUserClick(event)} />
   )
}

export default LoginButton
