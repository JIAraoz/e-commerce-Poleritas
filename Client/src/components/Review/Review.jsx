import React from 'react';

// eslint-disable-next-line react/prop-types
const Review = ({ reviewId, reviewRating, reviewDescription }) => {
  return (
    <div className="review">
      <div className="review-header">
        <div className="review-rating">
          {Array(reviewRating)
            .fill()
            .map((_, i) => (
              <span key={i} className="star">
                &#9733;
              </span>
            ))}
        </div>
      </div>
      <div className="review-body">
        <p className="review-description">{reviewDescription}</p>
      </div>
    </div>
  );
};

export default Review;