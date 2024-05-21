import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';

const Pagination = ({ productsPerPage, totalPages, paginate, currentPage }) => {
	const pageNumbers = [];

	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}

	const handlePaginate = (number) => {
		paginate(number);
		window.scrollTo(0, 0); // Desplazar hacia arriba al cambiar de página
	};

	return (
		<nav>
			<ul className='pagination'>
				{currentPage !== 1 && (
					<li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
						<a
							onClick={() => handlePaginate(currentPage - 1)}
							href='#!'
							className='page-link'
						>
							Anterior
						</a>
					</li>
				)}
				{pageNumbers.map((number) => (
					<li
						key={number}
						className={`page-item ${currentPage === number ? 'active' : ''}`}
					>
						<a
							onClick={() => handlePaginate(number)}
							href='#!'
							className='page-link'
						>
							{number}
						</a>
					</li>
				))}
				{currentPage !== totalPages && (
					<li
						className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
					>
						<a
							onClick={() => handlePaginate(currentPage + 1)}
							href='#!'
							className='page-link'
						>
							Siguiente
						</a>
					</li>
				)}
			</ul>
		</nav>
	);
};

Pagination.propTypes = {
	productsPerPage: PropTypes.number.isRequired,
	totalPages: PropTypes.number.isRequired,
	paginate: PropTypes.func.isRequired,
	currentPage: PropTypes.number.isRequired,
};

export default Pagination;
