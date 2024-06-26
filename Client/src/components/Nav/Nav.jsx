import React from 'react';
import './Nav.css';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Login from '../Auth0/Login/Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

function Nav() {
    const { user, isAuthenticated } = useAuth0();
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
                            {userData && userData.userImage ? (
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
