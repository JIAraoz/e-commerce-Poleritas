import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuery } from '../../redux/actions';
import axios from 'axios';
import Cards from '../Cards/Cards';
import Pagination from '../pagination/Pagination';
import './Products.css';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';

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
    const location = useLocation();
    const navigate = useNavigate();
    const productsPerPage = 5;

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const initialCategory = searchParams.get('category') || '';

        setOrder(query.order);
        setCategory(initialCategory || query.filter);
        setShowFilters(query.order || initialCategory || query.filter);

        const fetchProducts = async (page) => {
            setLoading(true);
            setNoResults(false);
            try {
                const response = await axios.get(
                    `https://e-commerce-grupo03.onrender.com/article/articles?page=${page}&limit=${productsPerPage}&category=${initialCategory || query.filter}&order=${query.order}&name=${query.search}`,
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
                setNoResults(true);
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get(
                    'https://e-commerce-grupo03.onrender.com/categories/category',
                );
                setCategories(response.data.result);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                });
            }
        };

        fetchCategories();
        fetchProducts(currentPage);
    }, [currentPage, query, location.search]);

    useEffect(() => {
        setShowFilters(order || category);
    }, [order, category]);

    const updateFilters = (newOrder, newCategory) => {
        const newQuery = { ...query, order: newOrder, filter: newCategory };
        dispatch(updateQuery(newQuery));
        setCurrentPage(1);

        const searchParams = new URLSearchParams();
        if (newOrder) searchParams.set('order', newOrder);
        if (newCategory) searchParams.set('category', newCategory);
        navigate({ search: searchParams.toString() });

        setShowFilters(true);
    };

    const handlerOrder = (newOrder) => {
        setOrder(newOrder);
        updateFilters(newOrder, category);
    };

    const handleCategory = (newCategory) => {
        setCategory(newCategory);
        updateFilters(order, newCategory);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const filteredProducts = products.filter(
        (product) => product.articleStock > 0 && product.isActive,
    );

    return (
        <div className="main-container">
            <div className="filters">
          <div className="custom-radio">
            <p className='name-filter'>Order</p>
                    <label>
                        <input
                            type="radio"
                            name="order"
                            className="order"
                            value="A-Z"
                            checked={order === 'A-Z'}
                            onChange={(e) => handlerOrder(e.target.value)}
                        />
                        A-Z
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="order"
                            className="order"
                            value="Z-A"
                            checked={order === 'Z-A'}
                            onChange={(e) => handlerOrder(e.target.value)}
                        />
                        Z-A
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="order"
                            className="order"
                            value="price-asc"
                            checked={order === 'price-asc'}
                            onChange={(e) => handlerOrder(e.target.value)}
                        />
                        ^ price
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="order"
                            className="order"
                            value="price-desc"
                            checked={order === 'price-desc'}
                            onChange={(e) => handlerOrder(e.target.value)}
                        />
                        v Price
                    </label>
                </div>
          <div className="custom-radio">
            <p className='name-filter'>category</p>
                    <label>
                        <input
                            type="radio"
                            name="category"
                            className="category"
                            value=""
                            checked={category === ''}
                            onChange={(e) => handleCategory(e.target.value)}
                        />
                        All
                    </label>
                    {categories.map((cat) => (
                        <label key={cat.categoryId}>
                            <input
                                type="radio"
                                name="category"
                                className="category"
                                value={cat.categoryId}
                                checked={category === JSON.stringify(cat.categoryId)}
                                onChange={(e) => handleCategory(e.target.value)}
                            />
                            {cat.categoryName}
                        </label>
                    ))}
                </div>
            </div>

            <div className="products-container">
                {noResults && !loading ? (
                    <div className="container-parent">
                        <div className="container-error">
                            <div className="robot">
                                <img src="/robot.jpg" alt="" />
                            </div>
                            <div className="text-err">
                                <h1>Sorry...</h1>
                                <p>
                                    we did not find what you are looking for, please choose
                                    another filter or another search
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <Cards products={filteredProducts} loading={loading} />
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


