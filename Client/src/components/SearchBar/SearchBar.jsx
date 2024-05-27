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
    setName(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    query.search = name;
    dispatch(updateQuery(query));
    navigate('/products');
  };
  return (
    <div className='search-bar'>
      <input
        type='search'
        onChange={handleChange}
        value={name}
        placeholder='Buscar...'
        onKeyDown={handleKeyDown}
      />
      <Link to='/products'>
        <button onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </Link>
      <div className='search-results'></div>
    </div>
  );
}