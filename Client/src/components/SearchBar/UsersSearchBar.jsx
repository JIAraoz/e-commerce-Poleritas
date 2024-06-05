/* eslint-disable react/prop-types */
import {useEffect } from 'react';
import axios from 'axios';
export default function UsersSearchBar({query,setQuery,setUsers,setCurrentPage,currentPage,setTotalPages}) {
	
	useEffect(() => {
		axios
			.get(`https://e-commerce-grupo03.onrender.com/user/list-users?userEmail=${query.email}&role=${query.filter}&page=${currentPage}`)
			.then((response) => {
				if (response.data && Array.isArray(response.data.result)) {
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
	}, [currentPage]);
	

	const handleChange = (e) => {
		setQuery({...query,email:e.target.value});
	};
	const handleSearch = () => {
		axios
			.get(
				`https://e-commerce-grupo03.onrender.com/user/list-users?userEmail=${query.email}&role=${query.filter}&page=${1}`,
			)
			.then(({ data }) => {
				setUsers(data.result);
				console.log(data);
				setTotalPages(data.totalPages)
				setCurrentPage(1)
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
