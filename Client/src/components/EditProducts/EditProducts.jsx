import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuery } from '../../redux/actions';
import axios from 'axios';
import CardsEdit from '../Cards/CardsEdit';
import Pagination from '../pagination/Pagination';
import './EditProduct.css';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';

export default function EditProducts() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [categories, setCategories] = useState([]);
	const [order, setOrder] = useState('');
	const [category, setCategory] = useState('');
	const [isActive, setIsActive] = useState('');
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

		async function fetchProducts(page) {
			setLoading(true);
			setNoResults(false); // Reset no results state
			try {
				const response = await axios.get(
					`https://e-commerce-grupo03.onrender.com/article/articles?page=${page}&limit=${productsPerPage}&category=${initialCategory || query.filter}&order=${query.order}&name=${query.search}&status=ALL`,
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
					icon: 'error',
					title: 'Oops...',
					text: 'No products were found with the applied filters or there was an error in the request.',
				});
				setNoResults(true);
				setLoading(false);
			}
		}

		async function fetchCategories() {
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
		}

		fetchCategories();
		fetchProducts(currentPage);
	}, [currentPage, query, location.search]);

	useEffect(() => {
		updateFilters(order, category, isActive);
	}, [isActive]);

	const updateFilters = (newOrder, newCategory, newIsActive) => {
		const newQuery = {
			...query,
			order: newOrder,
			filter: newCategory,
			isActive: newIsActive,
		};
		dispatch(updateQuery(newQuery));
		setCurrentPage(1);

		const searchParams = new URLSearchParams();
		if (newOrder) searchParams.set('order', newOrder);
		if (newCategory) searchParams.set('category', newCategory);
		if (newIsActive) searchParams.set('isActive', newIsActive);
		navigate({ search: searchParams.toString() });

		setShowFilters(true);
	};

	const handleIsActiveChange = (e) => {
		const newIsActive = e.target.value;
		setIsActive(newIsActive);
	};
	const handlerOrder = (event) => {
		const newOrder = event.target.value;
		setOrder(newOrder);
		updateFilters(newOrder, category);
	};

	const handleCategory = (event) => {
		const newCategory = event.target.value;
		setCategory(newCategory);
		updateFilters(order, newCategory);
	};

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const filteredProducts = products.filter((product) => {
		if (isActive === '') {
			return product.articleStock > 0;
		} else if (isActive === 'true') {
			return product.articleStock > 0 && product.isActive;
		} else {
			return product.articleStock > 0 && !product.isActive;
		}
	});

	return (
		<div>
			<div className='filters'>
				<div className='custom-select'>
					<label>
						Filter by active status:
						<select value={isActive} onChange={handleIsActiveChange}>
							<option value=''>All</option>
							<option value='true'>Active</option>
							<option value='false'>Inactive</option>
						</select>
					</label>
				</div>
				<div className='custom-select'>
					<select
						name='order'
						className='order'
						value={order}
						onChange={handlerOrder}
					>
						<option value=''>Order</option>
						<option value='A-Z'>A-Z</option>
						<option value='Z-A'>Z-A</option>
						<option value='price-asc'>↑ price</option>
						<option value='price-desc'>↓ Price</option>
					</select>
				</div>
				<div className='custom-select'>
					<select
						name='Category'
						className='order'
						value={category}
						onChange={handleCategory}
					>
						<option value=''>All</option>
						{categories.map((category, index) => (
							<option key={index} value={category.categoryId}>
								{category.categoryName}
							</option>
						))}
					</select>
				</div>
			</div>
			<div>
				{noResults && !loading ? (
					<div className='container-parent'>
						<div className='container-error'>
							<div className='robot'>
								<img src='/robot.jpg' alt='' />
							</div>
							<div className='text-err'>
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
						<CardsEdit products={filteredProducts} loading={loading} />
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
