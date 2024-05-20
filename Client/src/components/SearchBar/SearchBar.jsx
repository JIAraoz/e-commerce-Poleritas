import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom';
import { updateQuery } from '../../redux/actions';
import items from '../../items.json';
import Home from '../Home/Home';

export default function SearchBar() {

  const [name, setName] = useState('');

  const navigate=useNavigate();

  const [showMessage, setShowMessage] = useState(false);
  
  const dispatch = useDispatch();
  const query = useSelector(state => state.query);


  const handleChange = (event) => {
		setName(event.target.value);
	};

  const handleClick = (event) => {
    event.preventDefault();
    query.search = name;
    dispatch(updateQuery(query));
    setName('');
  };

  return (
    <div className="search-bar">
      <input
        type="search"
        onChange={handleChange}
        value={name}
        placeholder="Buscar..."
      />
      <Link to='/home'>
        <button onClick={handleClick}>Buscar</button>
      </Link>
      {showMessage && <div className="no-results">No se encontraron resultados.</div>}
      <div className="search-results">
     
      </div>
    </div>
  );

}
