import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuery } from '../../redux/actions';
import axios from 'axios';
import Cards from '../Cards/Cards';
import Pagination from '../pagination/Pagination';
import Swal from 'sweetalert2';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [categories, setCategories] = useState([]);
  const [order, setOrder] = useState('');
  const [category, setCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false); 
  const [noResults, setNoResults] = useState(false);
  const dispatch = useDispatch();
  const query = useSelector((state) => state.query);
  const productsPerPage = 5;

  useEffect(() => {
    setOrder(query.order);
    setCategory(query.filter);
    setShowFilters(query.order || query.filter);

    async function fetchProducts(page) {
      setLoading(true);
      setNoResults(false); // Reset no results state
      try {
        const response = await axios.get(
          `https://e-commerce-grupo03.onrender.com/article/articles?page=${page}&limit=${productsPerPage}&category=${query.filter}&order=${query.order}&name=${query.search}`
        );
        if (response.data.result.length === 0) {
          setNoResults(true);
        } else {
          setProducts(response.data.result);
          setTotalPages(response.data.totalPages);
          setCurrentPage(response.data.currentPage);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the products:', error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se encontraron productos con los filtros aplicados o hubo un error en la solicitud.",
        });
        setNoResults(true);
        setLoading(false);
      }
    }

    async function fetchCategories() {
      try {
        const response = await axios.get(
          'https://e-commerce-grupo03.onrender.com/categories/category'
        );
        setCategories(response.data.result);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      }
    }

    fetchCategories();
    fetchProducts(currentPage);
  }, [currentPage, query]);

  useEffect(() => {
    setShowFilters(order || category);
  }, [order, category]);

  const handlerOrder = (event) => {
    setOrder(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleFilters = () => {
    query.order = order;
    query.filter = category;
    setCurrentPage(1);
    dispatch(updateQuery(query));
    setShowFilters(true);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="filters">
        <div className="custom-select">
          <select name="order" value={order} onChange={handlerOrder}>
            <option value="">Order</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="price-asc">^ price</option>
            <option value="price-desc">v Price</option>
          </select>
        </div>
        <div className="custom-select">
          <select name="Category" value={category} onChange={handleCategory}>
            <option value="">All</option>
            {categories.map((category, index) => (
              <option key={index} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        
        <button onClick={handleFilters}>Aplicar filtros</button>
        {showFilters && (
          <div className="applied-filters">
            <span>
              Filtros aplicados: {' '}
              {order ? `Orden: ${order}` : ''}{' '}
              {category ? `Categoría: ${category}` : ''}
            </span>
          </div>
        )}
      </div>
      <div>
        {noResults && !loading ? (
          <h2 className='E-rror'>we did not find what you are looking for, please choose another filter or another search</h2>
        ) : (
          <>
            <Cards products={products} loading={loading} />
            <Pagination
              productsPerPage={productsPerPage}
              totalPages={totalPages}
              paginate={paginate}
              currentPage={currentPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
