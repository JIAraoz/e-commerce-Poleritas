import { useAuth0 } from '@auth0/auth0-react';
import './Profile.css';
import Logout from '../Logout/Logout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
// import Review from '../../Review/Review';
const Profile = () => {
	const { user, isAuthenticated } = useAuth0();
	const [ userData, setUserData ] = useState({});
  const [isImageExpanded, setIsImageExpanded] = useState(false);


	useEffect(() => {
		async function fetchUserData() {
			try {
				const response = await axios.get(
					`https://e-commerce-grupo03.onrender.com/user/user_email?email=${user.email}`
				);
				window.localStorage.setItem("userData", JSON.stringify(response.data.result));
			} catch (error) {
        // alert('Ha ocurrido un error: ' + error.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error has occurred:" + error.message,
        });
			}
		};

		fetchUserData();
	}, [userData])

	useEffect(() => {
		const data = window.localStorage.getItem("userData")
		if (data !== null) setUserData(JSON.parse(data))
	}, [])

   const toggleImageExpansion = () => {
    setIsImageExpanded(!isImageExpanded);
  };
	return (
    isAuthenticated && (
      <div>
        <div className='profile'>
          <div className={`profile-image-container ${isImageExpanded ? 'expanded' : ''}`} onClick={toggleImageExpansion}>
            <img src={userData.userImage} alt={userData.userName} />
          </div>
          <div className='profile-info'>
            <h2>Nombre: {userData.userName}</h2>
            <p>Correo: {userData.userEmail}</p>
            <p>Rol: {userData.userRol}</p>
            <Logout />
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
