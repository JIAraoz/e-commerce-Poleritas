import { Link } from 'react-router-dom';
import './card.css';

export default function Card({ id, title, image, price, product}) {
	return (
		<div className='card'>
			<Link to={`/detail/${id}`} state={{ product }}>
				<div className='image-container'>
					<img src={image} alt={title} />
				</div>
				<h2>{title}</h2>

				<p>{`Price: $${price}`}</p>
			</Link>
		</div>
	);
}
