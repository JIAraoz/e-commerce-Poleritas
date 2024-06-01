import { useAuth0 } from '@auth0/auth0-react';
import './Profile.css';
import Logout from '../Logout/Logout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
// import Review from '../../Review/Review';
const Profile = () => {
	const { user, isAuthenticated } = useAuth0();
	const [userData, setUserData] = useState({});
	const [isImageExpanded, setIsImageExpanded] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		userName: '',
		userImage: '',
		userDoorNumber: '',
		userStreetName: '',
		userCountry: '',
		userCity: '',
	});

	useEffect(() => {
		async function fetchUserData() {
			try {
				const response = await axios.get(
					`https://e-commerce-grupo03.onrender.com/user/user_email?email=${user.email}`,
				);
				setUserData(response.data.result);
				setFormData({
					userName: response.data.result.userName || '',
					userImage: response.data.result.userImage || '',
					userDoorNumber: response.data.result.userDoorNumber || '',
					userStreetName: response.data.result.userStreetName || '',
					userCountry: response.data.result.userCountry || '',
					userCity: response.data.result.userCity || '',
				});
			} catch (error) {
				// alert('Ha ocurrido un error: ' + error.message);
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'An error has occurred:' + error.message,
				});
			}
		}

		fetchUserData();
	}, []);

	const toggleImageExpansion = () => {
		setIsImageExpanded(!isImageExpanded);
	};

	const handleEditClick = () => {
		setIsEditing(!isEditing);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.put(
				`https://e-commerce-grupo03.onrender.com/user/editUser?id=${userData.userId}`,
				formData,
			);
			Swal.fire({
				icon: 'success',
				title: 'Success',
				text: 'User updated successfully',
			});
			setUserData(response.data.user);
			setIsEditing(false);
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'An error has occurred:' + error.message,
			});
		}
	};

	return (
		isAuthenticated && (
			<div>
				<div className='profile'>
					<div
						className={`profile-image-container ${isImageExpanded ? 'expanded' : ''}`}
						onClick={toggleImageExpansion}
					>
						<img src={userData.userImage} alt={userData.userName} />
					</div>
					<div className='profile-info'>
						<h2>Nombre: {userData.userName}</h2>
						<p>Correo: {userData.userEmail}</p>
						<p>Rol: {userData.userRol}</p>
						<button onClick={handleEditClick}>
							{isEditing ? 'Cancel' : 'Edit Profile'}
						</button>
						{isEditing && (
							<form onSubmit={handleFormSubmit}>
								<input
									type='text'
									name='userName'
									value={formData.userName}
									onChange={handleInputChange}
									placeholder='Name'
								/>
								<input
									type='text'
									name='userImage'
									value={formData.userImage}
									onChange={handleInputChange}
									placeholder='Image URL'
								/>
								<input
									type='text'
									name='userDoorNumber'
									value={formData.userDoorNumber}
									onChange={handleInputChange}
									placeholder='Door Number'
								/>
								<input
									type='text'
									name='userStreetName'
									value={formData.userStreetName}
									onChange={handleInputChange}
									placeholder='Street Name'
								/>
								<input
									type='text'
									name='userCountry'
									value={formData.userCountry}
									onChange={handleInputChange}
									placeholder='Country'
								/>
								<input
									type='text'
									name='userCity'
									value={formData.userCity}
									onChange={handleInputChange}
									placeholder='City'
								/>
								<button type='submit'>Save Changes</button>
							</form>
						)}
						<Logout />
					</div>
				</div>
			</div>
		)
	);
};

export default Profile;
