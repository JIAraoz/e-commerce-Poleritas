import { useNavigate } from 'react-router-dom';

export default function Cart({ allProducts, setAllProducts }) {
	let totalProducts = allProducts.length;
	let total = 0;
	let productCounts = {};
	const navigate = useNavigate();

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
		alert('Tu compra se ha realizado correctamente!');
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
				<button onClick={() => buyCart()}>Comprar</button>
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
