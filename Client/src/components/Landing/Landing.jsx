import Logout from '../Auth0/Logout/Logout';
import Login from '../Auth0/Login/Login';
import { useAuth0 } from '@auth0/auth0-react';

export default function Landing() {
    return (
        <div className='landing'>
            <Link to='/home'>
                <button className="landing-button">Bienvenid@s a nuestra tienda!!</button>
            </Link>
        </div>
    )
}
