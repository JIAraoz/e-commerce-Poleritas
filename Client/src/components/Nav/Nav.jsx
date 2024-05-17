import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import './Nav.css';

export default function Nav() {
    return (
        <div className='nav'>
            <Link to='/home'>
                <button>Inicio</button>
            </Link>

            <SearchBar className='searchBar'/>
            
            <Link to='/profile'>
                <button>Perfil</button>
            </Link>

            <Link to='/form'>
                <button>Form</button>
            </Link>
        </div>
    )
}