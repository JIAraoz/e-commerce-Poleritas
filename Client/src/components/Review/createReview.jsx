import React, { useState } from 'react';
import axios from 'axios';
import Rating from 'react-rating-stars-component';

// eslint-disable-next-line react/prop-types
const CreateReview = ({ userId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const backendUrl = 'https://e-commerce-grupo03.onrender.com/review/reviews';
      const response = await axios.post(backendUrl, {
        userId,
        reviewRating: rating,
        reviewDescription: comment,
      });
      console.log('Reseña creada:', response.data);
      setSuccess('Reseña creada exitosamente.');
      setError(null);
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error al crear la reseña:', error);

      if (error.response) {
        console.error('Respuesta del servidor:', error.response.data);
        setError(error.response.data.message || 'Error al crear la reseña.');
      } else if (error.request) {
        console.error('No se recibió respuesta:', error.request);
        setError('No se recibió respuesta del servidor.');
      } else {
        console.error('Error al configurar la solicitud:', error.message);
        setError('Error al configurar la solicitud.');
      }
      setSuccess(null);
    }
  };

  return (
    <div>
      <h2>Crear Reseña</h2>
      {error && <p style={{ color: 'red' }}>No puede crear una reseña por que ya tiene una o por que no tiene ninguna compra</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rating">Calificación:</label>
          <Rating
            count={5}
            value={rating}
            onChange={handleRatingChange}
            size={24}
            activeColor="#ffd700"
          />
        </div>
        <div>
          <label htmlFor="comment">Comentario:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={handleCommentChange}
          ></textarea>
        </div>
        <button type="submit">Enviar Reseña</button>
      </form>
    </div>
  );
};

export default CreateReview;
