/* eslint-disable react/prop-types */
import {useEffect } from 'react';
import axios from 'axios';
export default function UsersSearchBar({query,setQuery,setUsers,setCurrentPage,currentPage,setTotalPages,setNotFound}) {
	
	useEffect(() => {
		axios
			.get(`https://e-commerce-grupo03.onrender.com/user/list-users?userEmail=${query.email}&role=${query.filter}&page=${currentPage}`)
			.then((response) => {
				if (response.data && Array.isArray(response.data.result)) {
					setUsers(response.data.result);
					setTotalPages(response.data.totalPages)
					setCurrentPage(response.data.currentPage)
					console.log(response.data);
					setNotFound(false)
				} else {
					console.error(
						'La API no devolvió un array en la propiedad result: ',
						response.data,
					);
				}
			})
			.catch((error) => {
				console.error('Hubo un error al obtener los usuarios: ', error);
				setNotFound(true)
			});
	}, [currentPage]);
	
	
	const handleChange = (e) => {
		setQuery({...query,email:e.target.value});
	};
	const handleSearch = (rol) => {
		axios
			.get(
				`https://e-commerce-grupo03.onrender.com/user/list-users?userEmail=${query.email}&role=${rol||query.filter}&page=${1}`,
			)
			.then(({ data }) => {
				setUsers(data.result);
				setTotalPages(data.totalPages)
				setCurrentPage(1)
				setNotFound(false)
			}).catch((error)=>{
				console.error('Hubo un error al obtener los usuarios: ', error);
				setNotFound(true)
			});
	};
	const handleFilter=(e)=>{
		const rol=e.target.value
		setQuery({...query,filter:rol})
		handleSearch(rol)
	}
	return (
		<>
			<input
				type='search'
				onChange={handleChange}
				value={query.email}
				placeholder='Search by email'
			/>
			<button onClick={() => handleSearch()}></button>
			<div className='filter'>
				<label htmlFor="Status">Status:</label>
				<select name="Status" id="Status" onChange={handleFilter}>
					<option value="All">All</option>
					<option value="Admin">Admin</option>
					<option value="User">User</option>
					<option value="Banned">Banned</option>
				</select>
			</div>
		</>
	);
}
