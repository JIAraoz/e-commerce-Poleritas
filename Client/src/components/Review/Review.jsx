import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from 'react-rating-stars-component';
import './review.css';
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
				const response = await axios.get(
					`https://e-commerce-grupo03.onrender.com/review/reviews/${userId}`,
				);
				if (response.data) {
					setReview(response.data);
					setRating(response.data.reviewRating);
					setComment(response.data.reviewDescription);
				}
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
			const response = await axios.put(
				`https://e-commerce-grupo03.onrender.com/review/reviews/${review.id}`,
				{
					reviewRating: rating,
					reviewDescription: comment,
					userId,
				},
			);
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
		<div className='container-myreview'>
			{/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
			{review ? (
				<div>
					<div className='title-myreview'>
						<h2>Your Review</h2>
					</div>
					{editing ? (
						<div className='editrating-myreview'>
							<label className='label-myreview'>Rating:</label>
							<Rating
								count={5}
								value={rating}
								onChange={handleRatingChange}
								size={24}
								activeColor='#ffd700'
							/>
							<label className='label-myreview'>Comment:</label>
							<textarea value={comment} onChange={handleCommentChange} />
							<button onClick={handleUpdateReview}>Save</button>
							<button onClick={() => setEditing(false)}>Cancel</button>
						</div>
					) : (
						<div className='rating-myreview'>
							<p>
								Rating:{' '}
								<Rating
									count={5}
									value={review.reviewRating}
									size={24}
									edit={false}
									activeColor='#ffd700'
								/>
							</p>
							<p>Comment: {review.reviewDescription}</p>
							<button onClick={handleEditReview}>Edit</button>
						</div>
					)}
				</div>
			) : (
				!error && <p>You don't have a review yet.</p>
			)}
		</div>
	);
};

export default UserReview;
