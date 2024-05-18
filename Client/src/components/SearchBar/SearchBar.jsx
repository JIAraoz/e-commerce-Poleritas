import { useState } from 'react';
import items from "../../items.json"

export default function SearchBar() {
    const [name, setName] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [showMessage, setShowMessage] = useState(false);

    const handleChange = (event) => {
        setName(event.target.value);
    };

    const handleClick = (event) => {
        event.preventDefault();
        let filtered = items.filter((item) => (item.title.toLowerCase().includes(name.toLowerCase())))
        setFilteredItems(filtered);
        setName('');
        setShowMessage(filtered.length === 0 && name !== "");
    };

    return (
        <div>
            <input type='search' onChange={handleChange} value={name} />
            <button onClick={handleClick}>Buscar</button>
            { showMessage ? <div>No se encontraron resultados.</div> : null }
            <div>
                {filteredItems.map((item, index) => (
                    <div key={index}>{item.title}</div>
                ))}
            </div>
        </div>
    );
}
