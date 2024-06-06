import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewAdmin = () => {
	const [reviews, setReviews] = useState([]);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
	const [reviewsPerPage] = useState(10); // Número de reseñas por página

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const response = await axios.get(
					'https://e-commerce-grupo03.onrender.com/review/reviews_list',
				);
				if (response.data && Array.isArray(response.data.result)) {
					setReviews(response.data.result);
					setError(null);
				} else {
					setError(
						'The server response does not contain an array of reviews in the result field',
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
					setError('Error fetching reviews:');
				}
			}
		};

		fetchReviews();
	}, []);

	// Obtener índices de las reseñas para la página actual
	const indexOfLastReview = currentPage * reviewsPerPage;
	const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
	const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

	// Cambiar de página
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<div className='adminreview'>
			<h2>All Reviews</h2>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			{currentReviews.length > 0
				? currentReviews.map((review) => (
						<div
							key={review.reviewId}
							style={{
								border: '1px solid #ccc',
								margin: '10px',
								padding: '10px',
							}}
						>
							<p>
								<strong>User:</strong>{' '}
								{review.user ? review.user.userName : 'Anonymus'}
							</p>
							<p>
								<strong>Email: </strong>
								{review.user ? review.user.userEmail : 'Anonymus'}
							</p>
							<p>
								<strong>Rating:</strong> {review.reviewRating}
							</p>
							<p>
								<strong>Comment:</strong> {review.reviewDescription}
							</p>
						</div>
					))
				: !error && <p>No reviews available</p>}
			{/* Paginación */}
			<ul className='pagination'>
				{Array.from(
					{ length: Math.ceil(reviews.length / reviewsPerPage) },
					(_, i) => (
						<li
							key={i}
							className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}
						>
							<button onClick={() => paginate(i + 1)} className='page-link'>
								{i + 1}
							</button>
						</li>
					),
				)}
			</ul>
		</div>
	);
};

export default ReviewAdmin;
