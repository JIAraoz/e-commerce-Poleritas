import React, { useEffect } from 'react';
import './Nav.css';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Login from '../Auth0/Login/Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from 'sweetalert2';

function Nav() {
	const { user, isAuthenticated } = useAuth0();
	
	useEffect(() => {
		if (isAuthenticated && user) {
			// eslint-disable-next-line no-inner-declarations
			async function fetchUserData() {
				try {
					console.log("response")	
					const response = await axios.get(
						`https://e-commerce-grupo03.onrender.com/user/user_email?email=${user.email}`
					);
					window.localStorage.setItem('userData', JSON.stringify(response.data.result));
				} catch (error) {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'An error has occurred:' + error.message,
					});
				}
			}

			fetchUserData();
		}
	}, [isAuthenticated, user]);
	const userData = JSON.parse(window.localStorage.getItem("userData"));
	return (
		<div className='nav'>
			<div className='left'>
				<Link to='/'>
					<button>HOME</button>
				</Link>
				<Link to='/products'>
					<button>PRODUCTS</button>
				</Link>

				{/* <Link to='/about'>
					<button>ABOUT</button>
				</Link> */}
			</div>
			<div className='center'>
				<SearchBar className='searchBar' />
			</div>
			<div className='right'>
				{isAuthenticated ? (
					<Link to='/cart'>
						<button>
							<FontAwesomeIcon icon={faCartShopping} />
						</button>
					</Link>
				) : null}

				{isAuthenticated ? (
					<Link to='/profile'>
						<button
							style={{
								display: 'flex',
								alignItems: 'center',
								border: 'none',
								background: 'none',
								cursor: 'pointer',
								padding: 0,
							}}
						>
							{isAuthenticated && userData.userImage ? (
								<img
									src={userData.userImage}
									alt='Profile'
									style={{
										borderRadius: '50%',
										width: '40px',
										height: '40px',
										marginRight: '8px',
									}}
								/>
							) : (
								<img
									src='https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
									alt='Default Profile'
									style={{
										borderRadius: '50%',
										width: '40px',
										height: '40px',
										marginRight: '8px',
									}}
								/>
							)}
							<span style={{ fontSize: '16px' }}>My Profile</span>
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
