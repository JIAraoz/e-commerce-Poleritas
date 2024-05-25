import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Swal from 'sweetalert2'


export default function Cart({ allProducts, setAllProducts }) {
	let totalProducts = allProducts.length;
	let total = 0;
	let productCounts = {};
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth0();
	const { loginWithRedirect } = useAuth0();

	allProducts.forEach((product) => {
		total += product.articlePrice;
		if (productCounts[product.articleId]) {
			productCounts[product.articleId].quantity += 1;
		} else {
			productCounts[product.articleId] = {
				...product,
				quantity: 1,
			};
		}
	});

	const productList = Object.values(productCounts);

	const buyCart = () => {
    // alert('Tu compra se ha realizado correctamente!');
    Swal.fire({
      title: "Good buy!",
      text: "Your purchase has been successfully completed!",
      icon: "success"
    });
		navigate('/home');
		setAllProducts([]);
	};

	if (totalProducts > 0) {
		return (
			<div>
				{productList.map((product) => (
					<div key={product.articleId}>
						<img src={product.articleImage} alt={product.articleName} />
						<h2>{product.articleName}</h2>
						<p>Precio: ${product.articlePrice}</p>
						<p>Cantidad: {product.quantity}</p>
					</div>
				))}
				<h2>Cantidad total de productos: {totalProducts}</h2>
				<h2>Total: ${total}</h2>
				{isAuthenticated ? <button onClick={() => buyCart()}>Comprar</button> : <button onClick={() => loginWithRedirect()}>Debes iniciar sesion para poder comprar</button>}
			</div>
		);
	} else {
		return (
			<div>
				<h2>No tiene ningun articulo en el carrito.</h2>
			</div>
		);
	}
}
