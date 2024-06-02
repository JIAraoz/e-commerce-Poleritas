import React, { useState } from 'react';
import axios from 'axios';

const CreateReview = ({ userId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleRatingChange = (e) => {
    const value = Math.max(0, Math.min(5, e.target.value)); // Limitar el rango de 0 a 5
    setRating(value);
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
        // El servidor respondió con un código de estado fuera del rango 2xx
        console.error('Respuesta del servidor:', error.response.data);
        setError(error.response.data.message || 'Error al crear la reseña.');
      } else if (error.request) {
        // La solicitud se hizo pero no se recibió respuesta
        console.error('No se recibió respuesta:', error.request);
        setError('No se recibió respuesta del servidor.');
      } else {
        // Algo sucedió al configurar la solicitud que desencadenó un error
        console.error('Error al configurar la solicitud:', error.message);
        setError('Error al configurar la solicitud.');
      }
      setSuccess(null);
    }
  };

  return (
    <div>
      <h2>Crear Reseña</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rating">Calificación:</label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={handleRatingChange}
            min="0"
            max="5"
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

