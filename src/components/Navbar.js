import React from 'react';
import { NavLink } from 'react-router-dom';

const link = {
  width: '100px',
  padding: '12px',
  margin: '1em',
  background: 'blue',
  textDecoration: 'none',
  color: 'white',
}

const Navbar = (props) =>
  <div>
    <NavLink
      to="/"
      exact
      style={link}
      activeStyle={{
        background: 'darkblue'
      }}
    >Home</NavLink>
    <NavLink
      to="/about"
      exact
      style={link}
      activeStyle={{
        background: 'darkblue'
      }}
    >About</NavLink>
    <NavLink
      to="/future-games"
      exact
      style={link}
      activeStyle={{
        background: 'darkblue'
      }}
    >Future Projects</NavLink>
    <NavLink
      to="/play"
      exact
      style={link}
      activeStyle={{
        background: 'darkblue'
      }}
    >Play</NavLink>
  </div>;

  export default Navbar;