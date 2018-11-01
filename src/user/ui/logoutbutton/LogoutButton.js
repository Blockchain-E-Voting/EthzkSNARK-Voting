import React from 'react'
import { Menu } from 'semantic-ui-react'

const LogoutButton = ({ onLogoutUserClick }) => {

  return(
    <Menu.Item name='logout'  onClick={(event) => onLogoutUserClick(event)} />

  )
}

export default LogoutButton
