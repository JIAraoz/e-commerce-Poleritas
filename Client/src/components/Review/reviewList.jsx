import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from 'react-rating-stars-component';
import "./review-list.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('https://e-commerce-grupo03.onrender.com/review/reviews_list');
        if (response.data && Array.isArray(response.data.result)) {
          setReviews(response.data.result);
          setError(null);
        } else {
          setError('La respuesta del servidor no contiene un arreglo de reseñas en el campo "result".');
        }
      } catch (error) {
        console.error('Error al obtener las reseñas:', error);
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError('Error al obtener las reseñas');
        }
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="review-carousel"> {/* Agrega una clase para el carrusel */}
      <h2>Todas las Reseñas</h2>
      {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
      <FontAwesomeIcon icon={faArrowRight} />
      <div className="carousel"> {/* Contenedor del carrusel */}
        {reviews.map((review) => (
          <div key={review.reviewId} className="review-card"> {/* Estilos para cada tarjeta de reseña */}
            <p>
              <strong>Usuario:</strong> {review.user ? review.user.userName : 'Anónimo'}
            </p>
            <p>
              <strong>Calificación:</strong> 
              <Rating
                count={5}
                size={24}
                value={review.reviewRating}
                edit={false}
                activeColor="#ffd700"
              />
            </p>
            <p>
              <strong>Comentario:</strong> {review.reviewDescription}
            </p>
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default ReviewList;