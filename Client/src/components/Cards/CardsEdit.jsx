/* eslint-disable react/prop-types */
import CardEdit from '../Card/CardEdit';
import './CardsEdit.css';
export default function CardsEdit({ products, loading }) {
	return (
		<div className='cardsEdit-container-'>
			{loading ? (
				<div className='loading'>
					<p>Loading...</p>
				</div>
			) : (
				products.map((product) => {
					return (
						<CardEdit
							key={product.articleId}
							id={product.articleId}
							title={product.articleName}
							image={product.articleImage}
							price={product.articlePrice}
							stock={product.articleStock}
							isActive={product.isActive}
							product={product}
						/>
					);
				})
			)}
		</div>
	);
}
