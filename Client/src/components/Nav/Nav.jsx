import React from 'react';
import './Nav.css';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Login from '../Auth0/Login/Login';

function Nav() {
	const { isAuthenticated } = useAuth0();
	return (
		<nav className='nav'>
			<Link to='/home'>
				<button>Home</button>
			</Link>

			<SearchBar className='searchBar' />

			{isAuthenticated ? <Link to='/profile'><button>Profile</button></Link> : <Login />}
			

			<Link to='/cart'>
				<button>Cart</button>
			</Link>

			<Link to='/form'>
				<button>Form</button>
			</Link>
		</nav>
	);
}

export default Nav;
