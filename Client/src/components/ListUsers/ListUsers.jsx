import { useState } from 'react';
import UserCard from '../Card/CardUsers';
import UsersSearchBar from '../SearchBar/UsersSearchBar';
const ListUsers = () => {
	const [users, setUsers] = useState([]);
	return (
		<div>
			<h1>User List</h1>
			<UsersSearchBar setUsers={setUsers} />
			{Array.isArray(users) &&
				users.map((user, index) => {
					return <UserCard key={index} user={user} setUsers={setUsers} />;
				})}
		</div>
	);
};

export default ListUsers;
