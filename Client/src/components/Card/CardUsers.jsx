/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './CardUsers.css';

const UserCard = ({ user }) => {
	const roles = ['Admin', 'User', 'Banned'];
	const [status, setStatus] = useState(user.userRol);

	const handleButtonClick = async (newRol) => {
		try {
			const url = `https://e-commerce-grupo03.onrender.com/admin/ChangeRol?id=${user.userId}&rol=${newRol}`;
			axios.post(url, {}).then(() => {
				setStatus(newRol);
				console.log(Swal);
				Swal.fire({
					title: 'Change of role',
					text: 'The role was changed correctly',
					icon: 'success',
				});
			});
		} catch (error) {
			Swal.fire({
				title: 'Change of role',
				text: "An error occurred while trying to change the user's role",
				icon: 'error',
			});
		}
	};

	return (
		<div className='Mi-Componente-CardUser'>
			<div className='Mi-Item-CardUser'>
				<div className='userImage-container-CardUser'>
					<img src={`${user.userImage}`} alt='' />
				</div>
				<div className='Mi-Item-Details-CardUser'>
					<h2 className='Mi-Componente-title-CardUser'>{user.userName}</h2>
					<p className='price-CardUser'>{user.userEmail}</p>
					<p>Status: {status}</p>
				</div>

				<div className='card-footer-CardUser'>
					{roles.map((role) => (
						<button key={role} onClick={() => handleButtonClick(role)}>
							Change to {role}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default UserCard;
