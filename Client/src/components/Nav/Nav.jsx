import React from 'react';
import './Nav.css';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';

function Nav() {
	return (
		<nav className='nav'>
			<Link to='/home'>
				<button>Home</button>
			</Link>

			<SearchBar className='searchBar' />

			<Link to='/profile'>
				<button>Profile</button>
			</Link>

			<Link to='/form'>
				<button>Form</button>
			</Link>
		</nav>
	);
}

export default Nav;
