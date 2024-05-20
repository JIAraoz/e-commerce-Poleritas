import { useAuth0 } from '@auth0/auth0-react';
import './Profile.css';
import Logout from '../Logout/Logout';
import Footer from '../../Footer/Footer';
const Profile = () => {
	const { user, isAuthenticated } = useAuth0();

	return (
		isAuthenticated && (
      <div>
        
				<div className='profile'>
					<div className='profile-image-container'>
						<img src={user.picture} alt={user.name} />
					</div>
					<div className='profile-info'>
						<h2>Nombre: {user.name}</h2>
						<p>Correo: {user.email}</p>
						<Logout />
					</div>
				</div>
				<Footer />
			</div>
		)
	);
};

export default Profile;
