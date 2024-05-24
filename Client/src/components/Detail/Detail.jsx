// Detail.jsx
import axios from 'axios'
import { useParams } from 'react-router-dom';
import './Detail.css';

import { useEffect, useState } from 'react';

export default function Detail({ allProducts, setAllProducts }) {
	const { id } = useParams();
	const [product,setProduct]=useState()
	useEffect(()=>{
		async function getProduct(){
			const {data}=await axios.get(`https://e-commerce-grupo03.onrender.com/article/detail/${id}`)
			setProduct(data)
		}
		getProduct()
	},[id])


	if (!product) {
		return <div>Producto no encontrado</div>;
	}

	return (
		<div>
			<div className='detail-container'>
				<div className='detail'>
					<h2>ID: {product.articleId}</h2>
					<h4>Nombre: {product.articleName}</h4>
					<h4>Descripción: {product.articleDescription}</h4>
					<h4>Precio: {product.articlePrice}</h4>
					<h4>Stock: {product.articleStock}</h4>
					<h4>Categoría: {product.categories[0].categoryName}</h4>
				</div>
				<div className='photo-container'>
					<img src={product.articleImage} alt={product.articleName} />
				</div>
			</div>
			<Footer />
		</div>
	);
}
