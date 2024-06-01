/* eslint-disable react/prop-types */
import Card from '../Card/CardEdit';
import './CardsEdit.css';
export default function CardsEdit({ products, loading }) {
	return (
		<div className='cardsEdit-container-'>
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
