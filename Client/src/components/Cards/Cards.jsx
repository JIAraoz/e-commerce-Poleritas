/* eslint-disable react/prop-types */
import Card from '../Card/Card';
import "./Cards.css"
export default function Cards({ products ,loading }) {
    return( 
         
        <div className="cards-container">
    {loading ? (
      <p>Loading...</p>
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
  </div>)
};