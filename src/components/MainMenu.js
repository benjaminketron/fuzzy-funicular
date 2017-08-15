import React from 'react'
import PropTypes from 'prop-types'
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';

const MainMenu = ({open, setMenuOpen }) => {
  return (
  <Drawer 
    docked={false}
    open={open}
    onRequestChange={setMenuOpen}>
      <MenuItem>Home</MenuItem>
  </Drawer>
  )
}
  
MainMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  setMenuOpen: PropTypes.func.isRequired
}

export default MainMenu
