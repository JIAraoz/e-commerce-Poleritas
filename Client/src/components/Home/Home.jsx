import { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../Nav/Nav';
import './Home.css';
import Cards from '../Cards/Cards';
import Pagination from '../pagination/Pagination';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const productsPerPage = 5;

  useEffect(() => {
    async function fetchProducts(page) {
      setLoading(true);
      try {
        const response = await axios.get(`https://e-commerce-grupo03.onrender.com/articles?page=${page}&limit=${productsPerPage}`);
        setProducts(response.data.result);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the products:', error);
        setLoading(false);
      }
    }
    fetchProducts(currentPage);
  }, [currentPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="home">
      <div className="home-background">
        <Nav />
        <div className="home-content">
          <Cards products={products} loading={loading} />
          <Pagination productsPerPage={productsPerPage} totalPages={totalPages} paginate={paginate} currentPage={currentPage} />
        </div>
      </div>
    </div>
  );
}