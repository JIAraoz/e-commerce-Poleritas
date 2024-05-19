// import Logout from '../Auth0/Logout/Logout';
// import Login from '../Auth0/Login/Login';
// import { useAuth0 } from '@auth0/auth0-react';
// import "./Landing.css"

// export default function Landing() {
//   const { isAuthenticated } = useAuth0();

//   return (
//     <div className="landing">
//       <div className="landing-background">
//         <div className="landing-content">
//           {isAuthenticated ? <Logout /> : <Login />}
//         </div>
//       </div>
//     </div>
//   );
// }

import Logout from '../Auth0/Logout/Logout';
import Login from '../Auth0/Login/Login';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import "./Landing.css"
import { useEffect } from 'react';

export default function Landing() {

  const navigate=useNavigate()

  const { isAuthenticated } = useAuth0();

  useEffect(()=>{

    isAuthenticated && navigate("/home") 

  },[isAuthenticated,navigate])

  return (
    <div className="landing">
      <div className="landing-background">
        <div className="landing-content">
          {isAuthenticated ? <Logout /> : <Login />}
        </div>
      </div>
    </div>
  );
}


