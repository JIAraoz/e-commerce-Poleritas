import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
export default function Cart() {
	const { user } = useAuth0();
	const [userData, setUserData] = useState({});
	const [cartItems, setCartItems] = useState([]);
	const [cartResponse, setCartResponse] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchData() {
			try {
				const userResponse = await axios.get(
					`https://e-commerce-grupo03.onrender.com/user/user_email?email=${user.email}`,
				);
				setUserData(userResponse.data.result);

				if (userResponse.data.result.userId) {
					const cartResponse = await axios.get(
						`https://e-commerce-grupo03.onrender.com/cart/getShoppingCart?id=${userResponse.data.result.userId}`,
					);
					console.log(cartResponse.data);

					const activeCart = cartResponse.data.result.find(
						(cart) => cart.isActive === true,
					);
					if (activeCart && activeCart.articles) {
						setCartItems(activeCart.articles);
						setCartResponse(activeCart);
					}
				}
			} catch (error) {
				alert('Ha ocurrido un error: ' + error.message);
			}
		}

		fetchData();
	}, [user.email]);

	const handleRemoveButton = async (value) => {
		try {
			if (cartResponse) {
				const cartId = cartResponse.cartId;
				const response = await axios.get(
					`https://e-commerce-grupo03.onrender.com/cart/remove_article_cart?cartid=${cartId}&articleid=${value.articleId}`,
				);
				alert('Producto eliminado con éxito');
				if (response) window.location.reload();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleCleanButton = async () => {
		try {
			if (cartResponse) {
				const cartId = cartResponse.cartId;
				const response = await axios.get(
					`https://e-commerce-grupo03.onrender.com/cart/cleanShoppingCart?cartId=${cartId}`,
				);
				alert('Carrito limpiado con éxito');
				if (response) window.location.reload();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleBuyCart = async () => {
		try {
			if (cartResponse) {
				navigate('/checkout', {
					state: {
						cartItems,
						cartSubtotal: cartResponse.cartSubtotal,
						cartId: cartResponse.cartId,
					},
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	if (cartItems.length > 0) {
		return (
			<div className='Shooping-Cart'>
				<button onClick={() => handleCleanButton()}>Clean Cart</button>
				<p className='Shopping-Cart-title'>Shopping Cart</p>
				{cartItems.map((product) => (
					<div key={product.articleId} className='Cart-Item'>
						<img src={product.articleImage} alt={product.articleName} />
						<div className='Cart-Item-Details'>
							<h2>{product.articleName}</h2>
							<p>Price: ${product.articlePrice}</p>
							<p>Quantity: {product.Cart_Articule.articleQuantity}</p>
						</div>
						<button
							onClick={() => handleRemoveButton(product)}
							className='Remove-Button'
						>
							Remove item
						</button>
					</div>
				))}
				<div className='Cart-Totals'>
					<p>Total: ${cartResponse.cartSubtotal}</p>
				</div>
				<div className='Cart-Checkout'>
					<button onClick={() => handleBuyCart()}>Checkout</button>
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<h2>No tiene ningún artículo en el carrito.</h2>
			</div>
		);
	}
}
