import Logout from '../Auth0/Logout/Logout';
import Login from '../Auth0/Login/Login';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './Landing.css';
import { useEffect } from 'react';

export default function Landing() {
	const navigate = useNavigate();

	const { isAuthenticated } = useAuth0();

	useEffect(() => {
		isAuthenticated && navigate('/home');
	}, [isAuthenticated, navigate]);

	return (
		<div className='landing'>
			<div className='landing-background'>
				<div className='landing-content'>
					<img src='/Poleritas.png' alt='Poleritas' className='Logo' />
					<div className='texto'>
						<h1>Welcome to our Web Site</h1>
						<p>The best online store</p>
					</div>
					<div className='buttoms_zone'>
						{isAuthenticated ? <Logout /> : <Login />}
						<Link to={'/home'}>
						<div className='invitado'>
									<button>Ingresar como invitado</button>
						</div>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
