import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('https://e-commerce-grupo03.onrender.com/review/reviews');
        if (Array.isArray(response.data)) {
          setReviews(response.data);
          setError(null);
        } else {
          setError('La respuesta del servidor no es un arreglo de reseñas.');
        }
      } catch (error) {
        console.error('Error al obtener las reseñas:', error);
        if (error.response && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError('Error al obtener las reseñas');
        }
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      <h2>Todas las Reseñas</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id}>
            <p>
              <strong>Usuario:</strong> {review.userId}
            </p>
            <p>
              <strong>Calificación:</strong> {review.reviewRating}
            </p>
            <p>
              <strong>Comentario:</strong> {review.reviewDescription}
            </p>
          </div>
        ))
      ) : (
        <p>No hay reseñas disponibles.</p>
      )}
    </div>
  );
};

export default ReviewList;