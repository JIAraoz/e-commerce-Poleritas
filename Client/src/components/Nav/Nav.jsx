import React from 'react';
import './Nav.css';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Login from '../Auth0/Login/Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

function Nav() {
	const { isAuthenticated } = useAuth0();
	return (
		<div className='nav'>
			<div className='left'>
				<img src='/Poleritas.png' alt='Poleritas' className='Logo-NavBar' />
				<Link to='/home'>
					<button>HOME</button>
				</Link>
				<Link to='/products'>
					<button>PRODUCTS</button>
				</Link>
				<Link to='/about'>
					<button>ABOUT</button>
				</Link>
			</div>
			<div className='center'>
				<SearchBar className='searchBar' />
			</div>
			<div className='right'>
				<Link to='/cart'>
					<button>
						<FontAwesomeIcon icon={faCartShopping} />
					</button>
				</Link>
				{isAuthenticated ? (
					<Link to='/profile'>
						<button>
							<img
								src='https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
								alt='Profile'
								style={{ borderRadius: '50%', width: '40px', height: '40px' }}
							/>
							Mi perfil
						</button>
					</Link>
				) : (
					<Login />
				)}
			</div>
		</div>
	);
}

export default Nav;
