

import './card.css';

export default function Card({ title, description, image, price, size }) {
  return (
    
    <div className="card">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{`Price: $${price}`}</p>
      <p>{`Size: ${size}`}</p>
    </div>
  );
}


