import React from 'react';
import './Nav.css';
import SearchBar from '../SearchBar/SearchBar';
function Nav() {
  return (
    <nav className="nav">
      <ul className="nav-list">
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


