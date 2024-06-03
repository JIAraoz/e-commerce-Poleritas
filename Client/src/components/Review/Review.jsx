import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from 'react-rating-stars-component';

// eslint-disable-next-line react/prop-types
const UserReview = ({ userId }) => {
  const [review, setReview] = useState(null);
  const [editing, setEditing] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserReview = async () => {
      try {
        const response = await axios.get(`https://e-commerce-grupo03.onrender.com/review/reviews/${userId}`);
        setReview(response.data);
        setRating(response.data.reviewRating);
        setComment(response.data.reviewDescription);
      } catch (error) {
        console.error('Error al obtener la reseña del usuario:', error);
        if (error.response && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError('Error al obtener la reseña del usuario');
        }
      }
    };

    fetchUserReview();
  }, [userId]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleEditReview = () => {
    setEditing(true);
  };

  const handleUpdateReview = async () => {
    try {
      const response = await axios.put(`https://e-commerce-grupo03.onrender.com/review/reviews/${review.id}`, {
        reviewRating: rating,
        reviewDescription: comment,
        userId
      });
      setReview(response.data);
      setEditing(false);
      setError(null);
    } catch (error) {
      console.error('Error al actualizar la reseña:', error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Error al actualizar la reseña');
      }
    }
  };

  return (
    <div>
      <h2>Tu Reseña</h2>
      {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
      {review ? (
        <div>
          {editing ? (
            <div>
              <label>Calificación:</label>
              <Rating
                count={5}
                value={rating}
                onChange={handleRatingChange}
                size={24}
                activeColor="#ffd700"
              />
              <label>Comentario:</label>
              <textarea value={comment} onChange={handleCommentChange} />
              {editing && (
                <button onClick={handleUpdateReview}>Guardar</button>
              )}
              <button onClick={() => setEditing(false)}>Cancelar</button>
            </div>
          ) : (
            <div>
              <p>Calificación: <Rating count={5} value={review.reviewRating} size={24} edit={false} activeColor="#ffd700" /></p>
              <p>Comentario: {review.reviewDescription}</p>
              <button onClick={handleEditReview}>Editar</button>
            </div>
          )}
        </div>  
      ) : (
        <p>No tienes una reseña aún.</p>
      )}
    </div>
  );
};

export default UserReview;
