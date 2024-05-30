import { useAuth0 } from '@auth0/auth0-react';
import "./logout.css"
const Logout = () => {
	const { logout } = useAuth0();

	const handleLogout = () => {
		logout();
		window.localStorage.removeItem("userData");
	}

	return (
		<div>
			<button className='logout-button' onClick={() => handleLogout()}>Logout</button>
		</div>
	);
};

export default Logout;
