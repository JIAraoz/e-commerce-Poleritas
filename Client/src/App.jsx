import Profile from './components/Auth0/Profile/Profile';
import { useAuth0 } from '@auth0/auth0-react';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import Form from './components/Form/Form';
import { Routes, Route, useLocation } from 'react-router-dom';
import Detail from './components/Detail/Detail';
import Nav from './components/Nav/Nav';
import { useState } from 'react';
import Cart from './components/Cart/Cart';
import Footer from './components/Footer/Footer';
import Products from './components/Products/Products';

function App() {
	const { isLoading, isAuthenticated } = useAuth0();
	const { pathname } = useLocation();
	const [allProducts, setAllProducts] = useState([]);
	if (isLoading) return <h1>Cargando sesion...</h1>;
	return (
		<div>
			{pathname !== '/' && <Nav />}
			<Routes>
				<Route path='/' element={<Landing />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/home' element={<Home />} />
				<Route path='/form' element={<Form />} />
				<Route path='/products' element={<Products />} />

				<Route
					path='/detail/:id'
					element={
						<Detail allProducts={allProducts} setAllProducts={setAllProducts} />
					}
				/>
				<Route
					path='/cart'
					element={
						<Cart />
					}
				/>
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
