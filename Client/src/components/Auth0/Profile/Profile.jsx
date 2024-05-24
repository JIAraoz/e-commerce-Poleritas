import { useAuth0 } from '@auth0/auth0-react';
import './Profile.css';
import Logout from '../Logout/Logout';
import Footer from '../../Footer/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
	const { user, isAuthenticated } = useAuth0();
	const [ userData, setUserData ] = useState({});

	useEffect(() => {
		async function fetchUserData() {
			try {
				const response = await axios.get(
					`https://e-commerce-grupo03.onrender.com/user/user_email?email=${user.email}`
				);
				setUserData(response.data.result)
			} catch (error) {
				alert('Ha ocurrido un error: ' + error.message);
			}
		};

		fetchUserData();
	})
	return (
		isAuthenticated && (
			<div>
				<div className='profile'>
					<div className='profile-image-container'>
						<img src={userData.userImage} alt={userData.userName} />
					</div>
					<div className='profile-info'>
						<h2>Nombre: {userData.userName}</h2>
						<p>Correo: {userData.userEmail}</p>
						<p>Rol: {userData.userRol}</p>
					
					</div>
				</div>
				<Footer />
			</div>
		)
	);
};

export default Profile;
