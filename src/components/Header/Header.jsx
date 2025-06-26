import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const NavItem = ({ to, end = false, children }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}
  >
    {children}
  </NavLink>
);

const Header = () => {
  return (
    <header className="header">
      <h1>The Game of Thrones</h1>
      <nav className="navigation">
        <NavItem to="/" end>Characters</NavItem>
        <NavItem to="/guess">Guess</NavItem>
        <NavItem to="/search">Search</NavItem>
      </nav>
    </header>
  );
};

export default Header;