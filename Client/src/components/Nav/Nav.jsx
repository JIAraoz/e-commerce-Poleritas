import React from 'react';
import './Nav.css';
import SearchBar from '../SearchBar/SearchBar';
function Nav() {
  return (
    <nav className="nav">
      <Link to='/home'>
        <button>Home</button>
      </Link>
      
      <SearchBar className='searchBar' />

      <Link to='/profile'>
        <button>Perfil</button>
      </Link>

      <Link to='/form'>
          <button>Form</button>
      </Link>
      
    </nav>
  );
}

export default Nav;
            