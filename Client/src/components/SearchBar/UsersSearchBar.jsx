/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
export default function UsersSearchBar({query,setQuery,setUsers,setCurrentPage,setTotalPages}) {
	
	useEffect(() => {
		axios
			.get('https://e-commerce-grupo03.onrender.com/user/list-users')
			.then((response) => {
				if (response.data && Array.isArray(response.data.result)) {
					console.log('se setearon los user');
					setUsers(response.data.result);
					setTotalPages(response.data.totalPages)
					setCurrentPage(response.data.currentPage)
					console.log(response.data);
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

	const handleChange = (e) => {
		setQuery({...query,email:e.target.value});
	};
	const handleSearch = () => {
		axios
			.get(
				`https://e-commerce-grupo03.onrender.com/user/list-users?userEmail=${query.email}&role=${query.filter}`,
			)
			.then(({ data }) => {
				setUsers(data.result);
			});
	};

	return (
		<>
			<input
				type='search'
				onChange={handleChange}
				value={query.email}
				placeholder='Search by email'
			/>
			<button onClick={() => handleSearch()}></button>
		</>
	);
}
