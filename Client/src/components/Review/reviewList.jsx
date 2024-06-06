import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from 'react-rating-stars-component';
import './review-list.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const ReviewList = () => {
	const [reviews, setReviews] = useState([]);
	const [error, setError] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const response = await axios.get(
					'https://e-commerce-grupo03.onrender.com/review/reviews_list',
				);
				if (response.data && Array.isArray(response.data.result)) {
					setReviews(
						response.data.result.filter(
							(review) => review.user && review.user.userId,
						),
					);
					setError(null);
				} else {
					setError(
						'The server response does not contain a review array in the "result" field.',
					);
				}
			} catch (error) {
				console.error('Error fetching reviews:', error);
				if (
					error.response &&
					error.response.data &&
					error.response.data.message
				) {
					setError(error.response.data.message);
				} else {
					setError('Error fetching reviews');
				}
			}
		};

		fetchReviews();
	}, []);

	useEffect(() => {
		if (reviews.length > 0) {
			const interval = setInterval(() => {
				setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
			}, 4000); // La reseña se muestra por 4 segundos

			return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonte
		}
	}, [reviews]);

	return (
		<div className='review-carousel'>
			<h2>All Reviews</h2>
			<div className='carousel'>
				{reviews.length > 0 ? (
					reviews.map((review, index) => (
						<div
							key={review.reviewId}
							className={`review-card ${index === currentIndex ? 'active' : ''}`}
						>
							<FontAwesomeIcon icon={faArrowRight} />
							<p>
								<strong>User:</strong> {review.user.userName}
							</p>
							<p>
								<strong>Rating:</strong>
								<Rating
									count={5}
									size={24}
									value={review.reviewRating}
									edit={false}
									activeColor='#ffd700'
								/>
							</p>
							<p>
								<strong>Comment:</strong> {review.reviewDescription}
							</p>
						</div>
					))
				) : (
					<p>No reviews available.</p>
				)}
			</div>
		</div>
	);
};

export default ReviewList;
