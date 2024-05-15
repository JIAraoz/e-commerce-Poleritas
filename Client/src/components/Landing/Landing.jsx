import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

export default function Landing() {
    return (
        <div className='landing'>
            <Link to='/home'>
                <button className="landing-button">Ir al Home</button>
            </Link>
        </div>
    )
}
