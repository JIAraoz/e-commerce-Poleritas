import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import Nav from '../Nav/Nav';
import './Home.css';
import Cards from '../Cards/Cards';


export default function Home() {
  // Estado para almacenar los productos
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/src/items.json');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the products:', error);
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);
  
  return (
    <div className="home">
      <Nav />
      <div className="cards-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          products.map((product) => (
            <Card
              key={product.id}
              title={product.title}
              // description={product.description} comente para que no se haga muy grande la card
              image={product.image}
              price={product.price}
              stock={product.stock} 
            />
          ))
        )}
      </div>
    </div>
  );
}
