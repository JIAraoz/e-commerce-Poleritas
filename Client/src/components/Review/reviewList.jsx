import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from 'react-rating-stars-component';
import "./review-list.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 4000); // La reseña se muestra por 4 segundos

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonte
  }, [reviews.length]);

  return (
    <div className="review-carousel">
      <div className="carousel">
        {reviews.map((review, index) => (
          <div
          key={review.reviewId}
          className={`review-card ${index === currentIndex ? 'active' : ''}`}
          >
            <h2>Todas las Reseñas</h2>
            <FontAwesomeIcon icon={faArrowRight} />
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