/* eslint-disable react/prop-types */
import './card.css';

export default function Card({ title, image, price }) {
  return (
    <div className="card">
      <div className="card-image-container">
        <img src={image} alt={title} />
      </div>
      <div className="card-content">
        <h2>{title}</h2>
        <p className="card-price">${price}</p>
      </div>
    </div>
  );
}
