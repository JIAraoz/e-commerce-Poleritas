import React, { useState } from 'react';
import axios from 'axios';

const UserCard = ({ user }) => {
	const roles = ['Admin', 'User', 'Banned'];
	const [status, setStatus] = useState(user.userRol);

	const handleButtonClick = (newRol) => {
		const url = `https://e-commerce-grupo03.onrender.com/admin/ChangeRol?id=${user.userId}&rol=${newRol}`;

		axios
			.post(url)
			.then((response) => {
				if (response.data.message === 'item status changed successfully') {
					setStatus(newRol);
					alert(`El usuario ha sido cambiado a ${newRol} exitosamente.`);
				} else {
					alert('Hubo un error al intentar cambiar el estado del usuario.');
				}
			})
			.catch((error) => {
				console.error('Error making request:', error, error.response.data);
			});
	};

	return (
		<div className='Mi-Componente'>
			<div className='Mi-Item'>
				<div className='Mi-Item-Details'>
					<h2 className='Mi-Componente-title'>{user.userName}</h2>
					<p className='price'>{user.userEmail}</p>
					<p>Status: {status}</p>
				</div>

				<div className='card-footer'>
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
