import { useAuth0 } from '@auth0/auth0-react';
import './Profile.css';
import Logout from '../Logout/Logout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cloudinary from '../../Cloudinary/Cloudinary';
import Swal from 'sweetalert2';
import EditProducts from '../../EditProducts/EditProducts';
import ListUsers from '../../ListUsers/ListUsers';
import CreateReview from '../../Review/createReview';
import Review from '../../Review/Review';
import ReviewAdmin from '../../Review/reviewAdmin';
import Form from '../../Form/Form';
import { Navigate } from 'react-router-dom';
const Profile = () => {
	const { user, isAuthenticated } = useAuth0();
	const [userData, setUserData] = useState({});
	const [isImageExpanded, setIsImageExpanded] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [isEditProductsVisible, setIsEditProductsVisible] = useState(false);
	const [showListUsers, setShowListUsers] = useState(false);
	const [isCreateReviewVisible, setIsCreateReviewVisible] = useState(false);
	const [isReviewVisible, setIsReviewVisible] = useState(false);
	const [isReviewAdminVisible, setIsReviewAdminVisible] = useState(false);
	const [isFormVisible, setIsFormVisible] = useState(false);
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
	const handleEditProductsClick = () => {
		setShowListUsers(false);
		setIsCreateReviewVisible(false);
		setIsReviewVisible(false);
		setIsReviewAdminVisible(false);
		setIsEditProductsVisible(true);
		setIsFormVisible(false);
		setIsEditing(false);
		setIsImageExpanded(false);
		setIsEditProductsVisible(!isEditProductsVisible);
	};
	const handleEditClick = () => {
		setIsEditing(!isEditing);
	};
	const handleFormClick = () => {
		setShowListUsers(false);
		setIsCreateReviewVisible(false);
		setIsReviewVisible(false);
		setIsReviewAdminVisible(false);
		setIsEditProductsVisible(false);
		setIsFormVisible(true);
		setIsEditing(false);
		setIsImageExpanded(false);
		setIsFormVisible(!isFormVisible);
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
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

	const handleButtonClick = () => {
		setShowListUsers(false);
		setIsCreateReviewVisible(false);
		setIsReviewVisible(false);
		setIsReviewAdminVisible(false);
		setIsEditProductsVisible(false);
		setIsFormVisible(false);
		setIsEditing(false);
		setIsImageExpanded(false);
		setShowListUsers(!showListUsers);
	};

	const handleCreateReviewClick = () => {
		setShowListUsers(false);
		setIsCreateReviewVisible(false);
		setIsReviewVisible(false);
		setIsReviewAdminVisible(false);
		setIsEditProductsVisible(false);
		setIsFormVisible(false);
		setIsEditing(false);
		setIsImageExpanded(false);
		setIsCreateReviewVisible(!isCreateReviewVisible);
	};

	const handleReviewClick = () => {
		setShowListUsers(false);
		setIsCreateReviewVisible(false);
		setIsReviewVisible(false);
		setIsReviewAdminVisible(false);
		setIsEditProductsVisible(false);
		setIsFormVisible(false);
		setIsEditing(false);
		setIsImageExpanded(false);
		setIsReviewVisible(!isReviewVisible);
	};
	const handleReviewAdminClick = () => {
		setShowListUsers(false);
		setIsCreateReviewVisible(false);
		setIsReviewVisible(false);
		setIsReviewAdminVisible(false);
		setIsEditProductsVisible(false);
		setIsFormVisible(false);
		setIsEditing(false);
		setIsImageExpanded(false);
		setIsReviewAdminVisible(!isReviewAdminVisible); // Muestra ReviewAdmin cuando se abre ReviewAdmin
	};

	if (!isAuthenticated) {
		return <Navigate to='/Home' />;
	}
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
						<h2>Name: {userData.userName}</h2>
						<p>Email: {userData.userEmail}</p>
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
					<button onClick={handleCreateReviewClick}>
						{isCreateReviewVisible
							? 'Close create review'
							: 'Open create review'}
					</button>
					{userData.userRol === 'Admin' ? (
						<div className='button-container'>
							<button onClick={handleEditProductsClick}>Edit products</button>
							<button onClick={handleButtonClick}>
								{showListUsers ? 'Close user list' : 'Open user list'}
							</button>
							<button onClick={handleReviewClick}>
								{isReviewVisible ? 'Close review' : 'Open review'}
							</button>
							<button onClick={handleReviewAdminClick}>
								{isReviewAdminVisible
									? 'Close review admin'
									: 'Open review admin'}
							</button>
							<button onClick={handleFormClick}>
								{isFormVisible ? 'Close form' : 'Open form'}
							</button>
						</div>
					) : null}
				</div>
				{isCreateReviewVisible && <CreateReview userId={userData.userId} />}
				{userData.userRol === 'Admin' ? (
					<div className='admin'>
						{isEditProductsVisible && <EditProducts />}
						{showListUsers && <ListUsers />}
						{isReviewVisible && <Review userId={userData.userId} />}
						{isReviewAdminVisible && <ReviewAdmin />}
						{isFormVisible && <Form />}
					</div>
				) : null}
			</div>
		)
	);
};

export default Profile;
