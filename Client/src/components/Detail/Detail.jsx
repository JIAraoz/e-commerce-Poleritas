// Detail.jsx
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Detail.css';

import { useEffect, useState } from 'react';

export default function Detail({ allProducts, setAllProducts }) {
	const { id } = useParams();
	const [product, setProduct] = useState();
	useEffect(() => {
		async function getProduct() {
			const { data } = await axios.get(
				`https://e-commerce-grupo03.onrender.com/article/detail/${id}`,
			);
			setProduct(data);
		}
		getProduct();
	}, [id]);

	if (!product) {
		return <div>Producto no encontrado</div>;
	}

	return (
		<div>
			<button id='back-button'>Back</button>
			<div className='detail-container'>
				<div className='photo-container'>
					<img src={product.articleImage} alt={product.articleName} />
				</div>
				<div className='detail'>
					<h1 className='name'>{product.articleName}</h1>
					<h4 className='price'>${product.articlePrice}</h4>
					<div className='pay'>
						<div className='size-options'>
							<p>Size:</p>
							<select>
								<option value='xs'>XS</option>
								<option value='s'>S</option>
								<option value='m'>M</option>
								<option value='l'>L</option>
							</select>
						</div>
						<div className='payment-methods'>
							<p>Payment Methods</p>
							<img src='/Pagos.png' alt='pay' />
						</div>
					</div>
					<p className='stock'>Stock: {product.articleStock} pcs</p>
					<div className='cart-container'>
						<button className='add-to-cart'>Add to Cart</button>
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
