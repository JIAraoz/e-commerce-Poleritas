import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
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
  const [categories, setCategories] = useState([]);

  const query = useSelector(state => state.query)

  const productsPerPage = 5;

  useEffect(() => {
    async function fetchProducts(page) {
      setLoading(true);
      try {
        const response = await axios.get(`https://e-commerce-grupo03.onrender.com/articles?page=${page}&limit=${productsPerPage}&category=${query.filter}&order=${query.order}&name=${query.search}`);
        setProducts(response.data.result);  
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the products:', error);
        setLoading(false);
      }
    }
    async function fetchCategories () {
      try {
        const response = await axios.get('https://e-commerce-grupo03.onrender.com/getCategory')
        setCategories(response.data.result);
      } catch (error) {
        alert(error.message);
      }
    }
    fetchCategories()
    fetchProducts(currentPage);
  }, [currentPage]);

  const handleFilters = (evento) => {
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="home">
      <div className="home-background">
        <div className='filters'>
            <div className="custom-select">
                <select name="order" defaultValue=''>
                <option value="order" disabled='disabled'>Order</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="price-asc">^ price</option>
                <option value="price-desc">v Price</option>
                </select>
            </div>
            <div className="custom-select">
                <select name="Category" defaultValue=''>
                <option value=" ">All</option>
                {categories.map((category, index) => (
                    <option key={index} value={category.categoryName}>{category.categoryName}</option>
                ))} 
                </select>
            </div>
            <button onClick={handleFilters}>Aplicar filtros</button>
        </div>
        
        <div className="home-content">
          <Cards products={products} loading={loading} />
          <Pagination productsPerPage={productsPerPage} totalPages={totalPages} paginate={paginate} currentPage={currentPage} />
        </div>
      </div>
    </div>
  );
}