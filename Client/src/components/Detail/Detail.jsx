import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Detail.css';

import Swal from 'sweetalert2';

import { useEffect, useState } from 'react';

export default function Detail() {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const { user } = useAuth0();
	const [quantity, setQuantity] = useState(1);
	const navigate = useNavigate();
	const [size, setSize] = useState('articleS');

	useEffect(() => {
		async function getProduct() {
			try {
				const { data } = await axios.get(
					`https://e-commerce-grupo03.onrender.com/article/detail/${id}`,
				);
				setProduct(data);
			} catch (error) {
				console.error('Error fetching product details:', error);
			}
		}
		getProduct();
	}, [id]);

	if (!product) {
		return <div>Product not found</div>;
	}

	const handleAddToCart = async () => {
		try {
			const userResponse = await axios.get(
				`https://e-commerce-grupo03.onrender.com/user/user_email?email=${user.email}`,
			);

			if (userResponse.data.result.userId) {
				const cartResponse = await axios.get(
					`https://e-commerce-grupo03.onrender.com/cart/getShoppingCart?id=${userResponse.data.result.userId}`,
				);

				const activeCart = cartResponse.data.result.find(
					(cart) => cart.isActive === true,
				);
				if (activeCart) {
					const addArticleResponse = await axios.get(
						`https://e-commerce-grupo03.onrender.com/cart/add_article_cart?cartid=${activeCart.cartId}&articleid=${id}&quantity=${quantity}`,
					);
					if (addArticleResponse) {
						// alert('Tu producto ha sido agregado al carrito');
						Swal.fire({
							title: 'Your product has been added!',
							text: 'Your product has been successfully added!',
							icon: 'success',
						});
					}
				} else {
					// alert('No hay carrito activo disponible.');
					Swal.fire({
						icon: 'error',
						title: 'No active cart available.',
						text: 'There is no active cart available at this time.',
					});
				}
			}
		} catch (error) {
			console.error('Ha ocurrido un error: ' + error.message);
		}
	};

	const selectSize = (value) => {
		setQuantity(1);
		switch (value) {
			case 'S':
				return setSize('articleS');
			case 'M':
				return setSize('articleM');
			case 'L':
				return setSize('articleL');
			case 'XL':
				return setSize('articleXL');
			case 'XXL':
				return setSize('articleXXL');
		}
	};

	const incrementQuantity = () => {
		if (quantity < product[size]) {
			setQuantity(quantity + 1);
		}
	};

	const decrementQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<div>
			<button id='back-button' onClick={handleBack}>
				Back
			</button>
			<div className='detail-container'>
				<div className='photo-container'>
					<img src={product.articleImage} alt={product.articleName} />
				</div>
				<div className='detail'>
					<h1 className='name'>{product.articleName}</h1>
					<h4 className='price'>${product.articlePrice}</h4>
					<div className='pay'>
						<div className='payment-methods'>
							<p>Payment Methods</p>
							<img src='/pagos.png' alt='pay' />
						</div>
					</div>
					<p className='stock'>Stock: {product[size]} pcs</p>
					<div className='botones-size'>
						<p className='size-text'>Size:</p>
						<button
							onClick={() => selectSize('S')}
							className={size === 'articleS' ? 'button-selected' : 'button'}
						>
							S
						</button>
						<button
							onClick={() => selectSize('M')}
							className={size === 'articleM' ? 'button-selected' : 'button'}
						>
							M
						</button>
						<button
							onClick={() => selectSize('L')}
							className={size === 'articleL' ? 'button-selected' : 'button'}
						>
							L
						</button>
						<button
							onClick={() => selectSize('XL')}
							className={size === 'articleXL' ? 'button-selected' : 'button'}
						>
							XL
						</button>
						<button
							onClick={() => selectSize('XXL')}
							className={size === 'articleXXL' ? 'button-selected' : 'button'}
						>
							XXL
						</button>
					</div>
					<div className='quantity-container'>
						<label htmlFor='quantity'>Quantity:</label>
						<div className='quantity-controls'>
							<button onClick={decrementQuantity} disabled={quantity <= 1}>
								-
							</button>
							<span>{quantity}</span>
							<button
								onClick={incrementQuantity}
								disabled={quantity >= product[size]}
							>
								+
							</button>
						</div>
					</div>
					<div className='cart-container'>
						<button className='add-to-cart' onClick={() => handleAddToCart()}>
							Add to Cart
						</button>
						<p className='free-shipping'>Free Shipping!!</p>
					</div>
				</div>
			</div>
			<div className='description-container'>
				<h1>Description:</h1>
				<h4>{product.articleDescription}</h4>
				<h4>Category: {product.categories[0].categoryName}</h4>
			</div>
		</div>
	);
}
