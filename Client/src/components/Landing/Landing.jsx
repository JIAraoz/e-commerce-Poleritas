import Logout from '../Auth0/Logout/Logout';
import Login from '../Auth0/Login/Login';
import { useAuth0 } from '@auth0/auth0-react';

export default function Landing() {
  const { isAuthenticated} = useAuth0();
  return (
    <div  className="landing">
      {isAuthenticated ? <Logout /> : <Login />}
    </div>
  );

}
