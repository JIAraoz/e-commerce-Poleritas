import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from 'react-rating-stars-component';
import './createReview.css';
// eslint-disable-next-line react/prop-types
const CreateReview = ({ userId, onReviewCreated }) => {
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	const handleRatingChange = (newRating) => {
		setRating(newRating);
		setError(null); // Clear error when user starts changing the rating
	};

	const handleCommentChange = (e) => {
		setComment(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (rating === 0) {
			setError('Missing data to fill in.');
			return;
		}

		try {
			const backendUrl =
				'https://e-commerce-grupo03.onrender.com/review/reviews';
			const response = await axios.post(backendUrl, {
				userId,
				reviewRating: rating,
				reviewDescription: comment,
			});
			console.log('Review created:', response.data);
			setSuccess('Review successfully created.');
			setError(null);
			setRating(0);
			setComment('');
			onReviewCreated(); // Call the function provided by the parent to indicate that the review has been created
		} catch (error) {
			console.error('Error creating review:', error);

			if (error.response) {
				console.error('Server response:', error.response.data);
				setError(error.response.data.message || 'Error creating review.');
			} else if (error.request) {
				console.error('No response received:', error.request);
				setError('No response received from the server.');
			} else {
				console.error('Error setting up the request:', error.message);
				setError('Error setting up the request.');
			}
			setSuccess(null);
		}
	};
	return (
		<div className='container-review'>
			<div>
				<div className='title-review'>
					<h2>Create Review</h2>
				</div>
				{error && <p style={{ color: 'red' }}>{error}</p>}
				{success && <p style={{ color: 'green' }}>{success}</p>}
				<form onSubmit={handleSubmit} className='form-review'>
					<div className='rating-review'>
						<label className='label-review' htmlFor='rating'>
							Rating:
						</label>
						<Rating
							count={5}
							value={rating}
							onChange={handleRatingChange}
							size={24}
							activeColor='#ffd700'
						/>
					</div>
					<div className='comment-review'>
						<label className='titlecomment-review' htmlFor='comment'>
							Comment:
						</label>
						<textarea
							id='comment'
							name='comment'
							value={comment}
							onChange={handleCommentChange}
						/>
					</div>
					<button className='send-review' type='submit' disabled={rating === 0}>
						Submit Review
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateReview;
