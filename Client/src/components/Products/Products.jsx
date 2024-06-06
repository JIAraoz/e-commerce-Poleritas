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
    const [selectedSizes, setSelectedSizes] = useState([]);
    const dispatch = useDispatch();
    const query = useSelector((state) => state.query);
    const location = useLocation();
    const navigate = useNavigate();
    const productsPerPage = 5;

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const initialCategory = searchParams.get('category') || '';
        const initialSizes = searchParams.get('sizes') ? searchParams.get('sizes').split(',') : [];
        const initialOrder = searchParams.get('order') || '';

        setOrder(initialOrder || query.order);
        setCategory(initialCategory || query.filter);
        setSelectedSizes(initialSizes.length > 0 ? initialSizes : query.sizes || []);
        setShowFilters(initialOrder || initialCategory || initialSizes.length > 0 || query.order || query.filter || query.sizes);

        fetchCategories();
        fetchProducts(initialCategory, initialSizes, initialOrder, 1);
    }, [location.search]);

    useEffect(() => {
        fetchProducts(category, selectedSizes, order, 1);
    }, [query.search]);

    const fetchProducts = async (category, sizes, order, page) => {
        setLoading(true);
        setNoResults(false);
        try {
            const sizeQuery = sizes.length > 0 ? `&sizes=${sizes.join(',')}` : '';
            const response = await axios.get(
                `https://e-commerce-grupo03.onrender.com/article/articles?page=${page}&limit=${productsPerPage}&category=${category}&order=${order}&name=${query.search}${sizeQuery}`,
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

    const updateFilters = (newOrder, newCategory, newSizes) => {
        const newQuery = { ...query, order: newOrder, filter: newCategory, sizes: newSizes };
        dispatch(updateQuery(newQuery));
        setCurrentPage(1);

        const searchParams = new URLSearchParams();
        if (newOrder) searchParams.set('order', newOrder);
        if (newCategory) searchParams.set('category', newCategory);
        if (newSizes.length > 0) searchParams.set('sizes', newSizes.join(','));
        navigate({ search: searchParams.toString() });

        setShowFilters(true);

        fetchProducts(newCategory, newSizes, newOrder, 1);
    };

    const handlerOrder = (newOrder) => {
        setOrder(newOrder);
        updateFilters(newOrder, category, selectedSizes);
    };

    const handleCategory = (newCategory) => {
        setCategory(newCategory);
        updateFilters(order, newCategory, selectedSizes);
    };

    const handleSize = (size) => {
        const newSizes = selectedSizes.includes(size)
            ? selectedSizes.filter(s => s !== size)
            : [...selectedSizes, size];
        setSelectedSizes(newSizes);
        updateFilters(order, category, newSizes);
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        fetchProducts(category, selectedSizes, order, pageNumber);
    };

    const filteredProducts = products.filter(
        (product) => {
            const hasStockInAnySize = selectedSizes.length === 0 || selectedSizes.some(size => product[`article${size}`] > 0);
            return product.articleStock > 0 && product.isActive && hasStockInAnySize;
        }
    );

    const availableSizes = ['S', 'M', 'L', 'XL', 'XXL'].filter(size => products.some(product => product[`article${size}`] > 0));

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
                    <p className='name-filter'>Category</p>
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
                            checked={category === String(cat.categoryId)}
                            onChange={(e) => handleCategory(e.target.value)}
                        />
                            {cat.categoryName}
                        </label>
                    ))}
                </div>
                <div className="custom-checkbox">
                    <p className='name-filter'>Size</p>
                    {availableSizes.map(size => (
                        <label key={size}>
                            <input
                                type="checkbox"
                                name="size"
                                className="size"
                                value={size}
                                checked={selectedSizes.includes(size)}
                                onChange={() => handleSize(size)}
                            />
                            {size}
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
