import { useState } from 'react';
import UserCard from '../Card/CardUsers';
import UsersSearchBar from '../SearchBar/UsersSearchBar';
import Pagination from '../pagination/Pagination'

const ListUsers = () => {
	const [users, setUsers] = useState([]);
	const [query,setQuery]=useState({
		email:"",
		filter:""
	})
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const productsPerPage=10
	const paginate = (pageNumber) => {setCurrentPage(pageNumber)
	console.log(currentPage);};
	return (
		<div>
			<h1>User List</h1>
			<UsersSearchBar setUsers={setUsers} query={query} setQuery={setQuery} setCurrentPage={setCurrentPage}currentPage={currentPage} setTotalPages={setTotalPages}/>
			{Array.isArray(users) &&
				users.map((user, index) => {
					return <UserCard key={index} user={user} setUsers={setUsers} />;
				})}
				<Pagination
							productsPerPage={productsPerPage}
							totalPages={totalPages}
							paginate={paginate}
							currentPage={currentPage}
						/>
		</div>
	);
};

export default ListUsers;
