/* eslint-disable react/prop-types */


import './card.css';

export default function Card({ title, image, price}) {
  return (
    
    <div className="card">
      <div className="image-container" >
      <img src={image} alt={title} />

      </div>
      <h2>{title}</h2>
     
      <p>{`Price: $${price}`}</p>
    
    </div>
  );
}


