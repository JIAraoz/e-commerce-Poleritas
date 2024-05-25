import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Cart() {
	const { user } = useAuth0();
	const [userData, setUserData] = useState({});
	
	useEffect(() => {
		async function fetchData() {
			try {
				const userResponse = await axios.get(
					`https://e-commerce-grupo03.onrender.com/user/user_email?email=${user.email}`
				);
				setUserData(userResponse.data.result);

				if (userResponse.data.result.userId) {
					const cartResponse = await axios.get(`https://e-commerce-grupo03.onrender.com/cart/getShoppingCart?id=${userResponse.data.result.userId}`);
					console.log(cartResponse.data.result);
				}
			} catch (error) {
				alert('Ha ocurrido un error: ' + error.message);
			}
		}

		fetchData();
	}, [user.email]);

	return (
		<div>
			<h1>cart</h1>
		</div>
	);
}
