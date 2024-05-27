import { Link } from 'react-router-dom';
import './card.css';

export default function Card({ id, title, image, price, product}) {
	return (
		<div className='card'>
			<Link className="link-0" to={`/detail/${id}`} state={{ product }}>
				<div className='image-container'>
					<img src={image} alt={title} />
				</div>
				<h1 className='name'>{title}</h1>
				<div className='card-footer'>
					<p className='price'>{`Price: $${price}`}</p>
					<img className='icoFS' src='/EnvioGratis.png' alt='' />
				</div>
			</Link>
		</div>
	);
}
