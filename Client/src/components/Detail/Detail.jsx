import React from "react";
import { useLocation } from 'react-router-dom';
import "./Detail.css";

export default function Detail({ products }) {
    const location = useLocation();
    const regex = /\d+/;
    const id = location.pathname.match(regex)[0];
    
    return (
        <div className='detail-container'>
            <div className='detail'>
                <h2>ID: {products[0].articleId}</h2>
                <h4>Nombre: {products[0].articleName}</h4>
                <h4>Descripcion: {products[0].articleDescription}</h4>
                <h4>Precio: {products[0].articlePrice}</h4>
                <h4>Stock: {products[0].articleStock}</h4>
                <h4>Categoria: {products[0].Category}</h4>
            </div>

            <div className="photo-container">
                <img src={products[0].articleImage} alt={products[0].articleId}/>
            </div>
        </div>
    )
}