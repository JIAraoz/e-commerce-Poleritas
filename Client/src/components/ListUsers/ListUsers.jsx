import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from '../Card/CardUsers';

const ListUsers = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		axios
			.get('https://e-commerce-grupo03.onrender.com/user/list-users')
			.then((response) => {
				if (response.data && Array.isArray(response.data.result)) {
					setUsers(response.data.result);
				} else {
					console.error(
						'La API no devolvió un array en la propiedad result: ',
						response.data,
					);
				}
			})
			.catch((error) => {
				console.error('Hubo un error al obtener los usuarios: ', error);
			});
	}, []);

	return (
		<div>
			<h1>Lista de Usuarios</h1>
			{Array.isArray(users) &&
				users.map((user, index) => {
					console.log(user);
					return <UserCard key={index} user={user} />;
				})}
		</div>
	);
};

export default ListUsers;
