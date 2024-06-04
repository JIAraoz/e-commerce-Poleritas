/* eslint-disable react/prop-types */
import CardUsers from '../Card/CardUsers';

export default function CardsUsers({ users, loading, setUsers}) {
	
	return (
		<>
		
		<div className='cards-container'>
			{loading ? (
				<div className='loading'>
					<p>Loading...</p>
				</div>
			) : (
				users.map((user) => {
					return (
						<CardUsers
							key={user.id}
							id={user.id}
							name={user.name}
							email={user.email}
							role={user.role}
							
							/>
							);
						})
						)}
		</div>
		</>
	);
}
