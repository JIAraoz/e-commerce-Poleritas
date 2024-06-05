import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuery } from '../../redux/actions';
import axios from 'axios';
import './Home.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import ReviewList from '../Review/reviewList';
export default function Home() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [categories, setCategories] = useState([]);
	const [order, setOrder] = useState('');
	const [category, setCategory] = useState('');
	const { user, isAuthenticated } = useAuth0();

	useEffect(() => {
		if (isAuthenticated && user) {
			const userData = {
				userName: user.name,
				userEmail: user.email,
				userImage: user.picture,
			};

			// eslint-disable-next-line no-inner-declarations
			async function fetchUserData() {
				try {
					await axios.post(
						'https://e-commerce-grupo03.onrender.com/user/postUser',
						userData,
					);
				} catch (error) {
					console.log(error);
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'An error has occurred: ' + error.message,
					});
				}
			}

			fetchUserData();
		}
	}, [isAuthenticated, user]);

	useEffect(() => {
		if (isAuthenticated && user) {
			// eslint-disable-next-line no-inner-declarations
			async function fetchUserData() {
				try {
					const response = await axios.get(
						`https://e-commerce-grupo03.onrender.com/user/user_email?email=${user.email}`
					);
					window.localStorage.setItem('userData', JSON.stringify(response.data.result));
				} catch (error) {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'An error has occurred:' + error.message,
					});
				}
			}

			fetchUserData();
		}
	}, [isAuthenticated, user]);

	const dispatch = useDispatch();

	const query = useSelector((state) => state.query);

	const productsPerPage = 5;

	useEffect(() => {
		async function fetchProducts(page) {
			setLoading(true);
			try {
				const response = await axios.get(
					`https://e-commerce-grupo03.onrender.com/article/articles?page=${page}&limit=${productsPerPage}&category=${query.filter}&order=${query.order}&name=${query.search}`,
				);
				setProducts(response.data.result);
				setTotalPages(response.data.totalPages);
				setCurrentPage(response.data.currentPage);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching the products:', error);
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Error fetching the products: ' + error,
				});
				setLoading(false);
			}
		}

		async function fetchCategories() {
			try {
				const response = await axios.get(
					'https://e-commerce-grupo03.onrender.com/categories/category',
				);
				setCategories(response.data.result);
			} catch (error) {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: error.message,
				});
			}
		}


    // const handlerOrder = (event) => {
	// 	setOrder(event.target.value);
	// };

	// const handleCategory = (event) => {
	// 	setCategory(event.target.value);
	// };

	// const handleFilters = () => {
	// 	query.order = order;
	// 	query.filter = category;
	// 	setCurrentPage(1);
	// 	dispatch(updateQuery(query));
	// };

    // const paginate = (pageNumber) => setCurrentPage(pageNumber);
    

		fetchCategories();
		fetchProducts(currentPage);
	}, [currentPage, query]);

	return (
		<div className='home'>
			<div className='categories'>
				<div className='category-item'>
					<Link className='a' to='/products?category=8'>
						<img src='../deportivas.jpg' alt="Men's" className='img-m' />
						<p>Sports</p>
					</Link>
				</div>
				<div className='category-item'>
					<Link className='a' to='/products?category=7'>
						<img src='/casual.jpg' alt="casual" />
						<p>Casual</p>
					</Link>
				</div>
				<div className='category-item'>
					<Link className='a' to='/products?category=10'>
						<img src='../polos.jpg' alt='polos' />
						<p>Polo</p>
					</Link>
        </div>
        	<div className='category-item'>
					<Link className='a' to='/products?category=9'>
						<img src='../tanktop.jpg' alt='tanktop' />
						<p>Polo</p>
					</Link>
				</div>
      </div>
      {/* <div className='products-section'> */}
				{/* <div className='products-title'>Best Sellers</div> */}
				{/* <div className='product-carousel'> */}
					{/* inserta los producto de cards aqui */}
				{/* </div> */}
				{/* <div className='products-title'>New</div> */}
				{/* <div className='product-carousel'> */}
					{/* inserta los producto de cards aqui*/}
				{/* </div>
			</div> */}
			<div className='shipping-info'>
				<div className='free-shipping'>
					<img className='img-envio' src='../envios.png' alt='envio gratis' />
				</div>
				<div className='international-shipping'>
					<h2>International Shipping</h2>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum
						suscipit perferendis tenetur aliquid sit similique nam, voluptate
						alias nesciunt sint ipsam facilis facere aut, eaque tempore vitae
						quisquam, neque odio!
					</p>
					<img className='envioSeguro' src='/envioSeguro.png' alt='seguro' />
        </div>
        <ReviewList/>
			</div>
		</div>
	);
}
