import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { updateQuery } from '../../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';

export default function SearchBar() {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const query = useSelector((state) => state.query);

  useEffect(() => {
    setName(query.search || '');
  }, [query.search]);

  const handleChange = (event) => {
    const value = event.target.value;
    setName(value);
    handleSearch(value);
  };

  const handleSearch = (searchTerm) => {
    const updatedQuery = { ...query, search: searchTerm };
    dispatch(updateQuery(updatedQuery));
    navigate('/products');
  };

  return (
    <div className='search-bar'>
      <input
        type='search'
        onChange={handleChange}
        value={name}
        placeholder='Buscar...'
      />
      <Link to='/products'>
        <button onClick={() => handleSearch(name)}>
        </button>
      </Link>
      <div className='search-results'></div>
    </div>
  );
}
