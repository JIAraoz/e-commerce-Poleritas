import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Profile from './components/Auth0/Profile/Profile';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import Nav from './components/Nav/Nav';
import Cart from './components/Cart/Cart';
import Footer from './components/Footer/Footer';
import Products from './components/Products/Products';
import Checkout from './components/Checkout/Checkout';
import ListUsers from './components/ListUsers/ListUsers';
import './App.css';
import axios from 'axios';

function App() {
	const [isBanned, setIsBanned] = useState(false);
	const { user } = useAuth0();

	useEffect(() => {
        const fetchData = async () => {
            if (user && user.email) {
                try {
                    const response = await axios.get(`https://e-commerce-grupo03.onrender.com/user/user_email?email=${user.email}`);

                    if (response.data.result.userRol === "Banned") {
                        setIsBanned(true);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };

        fetchData();
    }, [user]);

    if (isBanned) {
        return (
            <div>
                <h2>You are banned</h2>
                <p>Write an email to poleritas0@gmail.com for more information.</p>
            </div>
        );
    }
 
	return (
		<div className='app-container'>
			<Nav />
			<div className='content'>
				<Routes>
					<Route path='/' element={<Home/>} />
					<Route path='/home' element={<Home />} />
					<Route path='/profile' element={<Profile />} />
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
