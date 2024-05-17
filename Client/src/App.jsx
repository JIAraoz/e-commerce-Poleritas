import Profile from './components/Auth0/Profile/Profile';
import { useAuth0 } from '@auth0/auth0-react';
// import Cloudinary from "./components/Cloudinary/Cloudinary"
import { Routes, Route,useNavigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';

function App() {
	const navigate=useNavigate()
	const { isAuthenticated, isLoading } = useAuth0();

	if (isLoading) return <h1>Cargando sesion...</h1>;
	isAuthenticated && navigate('/home')
	return (
		<div>
			
		
			
			<Routes>
				<Route path='/' element={<Landing />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/home' element={<Home />} />
			</Routes>
		</div>
	);
}

export default App;
