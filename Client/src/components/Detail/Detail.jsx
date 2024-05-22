// Detail.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import './Detail.css';
import Footer from '../Footer/Footer';
import { all } from 'axios';

export default function Detail({ allProducts, setAllProducts }) {
	const location = useLocation();
	const product = location.state.product;

	if (!product) {
		return <div>Producto no encontrado</div>;
	}

	const toCart = () => {
		alert("Tu producto se ha agregado al carrito.")
		setAllProducts([...allProducts, product])
	}

	return (
		<div>
			<div className='detail-container'>
				<div className='detail'>
					<h2>ID: {product.articleId}</h2>
					<h4>Name: {product.articleName}</h4>
					<h4>Description: {product.articleDescription}</h4>
					<h4>Price: {product.articlePrice}</h4>
					<h4>Stock: {product.articleStock}</h4>
					<h4>Category: {product.categories[0].categoryName}</h4>
				</div>
				<div className='photo-container'>
					<img src={product.articleImage} alt={product.articleName} />
				</div>
				<button onClick={() => toCart()}>Añadir al carrito</button>
			</div>
			<Footer />
		</div>
	);
}
