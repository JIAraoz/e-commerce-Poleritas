

import { Link } from "react-router-dom"
import './card.css';

export default function Card({ title, image, price, id}) {

  return (
    <div className="card">

      <Link to={`/detail/${id}`}>
        <div className="image-container" >
        <img src={image} alt={title} />

        </div>
        <h2>{title}</h2>
      
        <p>{`Price: $${price}`}</p>
      </Link>

    </div>
  );
}
