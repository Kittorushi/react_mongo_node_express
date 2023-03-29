import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './Navbarelement';
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
  
        <NavMenu>
          <NavLink  className='nav-menu-item' to='/'>
            Address
          </NavLink>
          <NavLink  className='nav-menu-item' to='/Transaction' >
            Transaction
          </NavLink>
          <NavLink  className='nav-menu-item' to='/Wallet'>
           Wallet
          </NavLink>
          <NavLink  className='nav-menu-item' to='/Receipt' >
          Receipt
          </NavLink>

        
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
       
      </Nav>
    </>
  );
};
  
export default Navbar;