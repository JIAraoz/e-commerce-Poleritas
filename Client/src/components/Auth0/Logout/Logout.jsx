import { useAuth0 } from '@auth0/auth0-react';
import "./logout.css"
const Logout = () => {
	const { logout } = useAuth0();

	return (
		<div>
			<button className='logout-button' onClick={() => logout()}>Logout</button>
		</div>
	);
};

export default Logout;
