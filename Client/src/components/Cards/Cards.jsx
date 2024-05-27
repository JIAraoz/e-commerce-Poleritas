/* eslint-disable react/prop-types */
import Card from '../Card/Card';
import './Cards.css';
export default function Cards({ products, loading }) {
	return (
		<div className='cards-container'>
			{loading ? (
				<div className='loading'>

				<p>Loading...</p>
				</div>
			) : (
				products.map((product) => (
					<Card
						key={product.articleId}
						id={product.articleId}
						title={product.articleName}
						image={product.articleImage}
						price={product.articlePrice}
						stock={product.articleStock}
						product={product}
					/>
				))
			)}
		</div>
	);
}
