import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Profile from './components/Auth0/Profile/Profile';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import Form from './components/Form/Form';
import Detail from './components/Detail/Detail';
import Nav from './components/Nav/Nav';
import Cart from './components/Cart/Cart';
import Footer from './components/Footer/Footer';
import Products from './components/Products/Products';
import Checkout from './components/Checkout/Checkout';
import ListUsers from './components/ListUsers/ListUsers';
import './App.css';
function App() {
	return (
		<div className='app-container'>
			<Nav />
			<div className='content'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/form' element={<Form />} />
					<Route path='/products' element={<Products />} />
					<Route path='/detail/:id' element={<Detail />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/checkout' element={<Checkout />} />
					<Route path='/ListUsers' element={<ListUsers />} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
}

export default App;
