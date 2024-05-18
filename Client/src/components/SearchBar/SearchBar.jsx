import { useState } from 'react';
import items from '../../items.json';

export default function SearchBar() {
  const [name, setName] = useState('');
  
  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    let filtered = items.filter((item) => 
      item.title.toLowerCase().includes(name.toLowerCase())
    );
    // setFilteredItems(filtered);
    setName('');
    setShowMessage(filtered.length === 0 && name !== '');
  };

  return (
    <div className="search-bar">
      <input
        type="search"
        onChange={handleChange}
        value={name}
        placeholder="Buscar..."
      />
      <button onClick={handleClick}>Buscar</button>
      {showMessage && <div className="no-results">No se encontraron resultados.</div>}
      <div className="search-results">
     
      </div>
    </div>
  );
}
