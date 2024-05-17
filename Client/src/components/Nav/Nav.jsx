import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Logout from '../Auth0/Logout/Logout';
import Login from '../Auth0/Login/Login';
import { useAuth0 } from '@auth0/auth0-react';
import './Nav.css';
function Nav() {
  const { isAuthenticated} = useAuth0();
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li>{isAuthenticated ? <Logout /> : <Login />}</li>
        <li className="nav-item"><a href="/home">Home</a></li>
        <li className="nav-item"><a href="/products">Products</a></li>
        <li className="nav-item"><a href="/about">About</a></li>
        <li className="nav-item"><a href="/contact">Contact</a></li>
      </ul>
<SearchBar className='searchBar' />
    </nav>
  );
}

export default Nav;


