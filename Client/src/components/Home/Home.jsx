import { useState, useEffect } from 'react';
import axios from 'axios'
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
        const response = await axios.get("https://e-commerce-grupo03.onrender.com/articles");
        setProducts(response.data.result);
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
      <Cards products={products} loading={loading} ></Cards>
    </div>
  );
}
