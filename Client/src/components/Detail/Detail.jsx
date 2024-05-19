// Detail.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import './Detail.css'; 

export default function Detail() {
  const location = useLocation();
  const product = location.state.product

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className='detail-container'>
      <div className='detail'>
        <h2>ID: {product.articleId}</h2>
        <h4>Nombre: {product.articleName}</h4>
        <h4>Descripción: {product.articleDescription}</h4>
        <h4>Precio: {product.articlePrice}</h4>
        <h4>Stock: {product.articleStock}</h4>
        <h4>Categoría: {product.categories[0].categoryName}</h4>
      </div>
      <div className="photo-container">
        <img src={product.articleImage} alt={product.articleName} />
      </div>
    </div>
  );
}