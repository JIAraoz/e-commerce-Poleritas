import Login from "./components/Auth0/Login/Login"
import Profile from "./components/Auth0/Profile/Profile"
import Logout from "./components/Auth0/Logout/Logout"
import { useAuth0 } from "@auth0/auth0-react"
import Cloudinary from "./components/Cloudinary/Cloudinary"

function App() {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) return <h1>Cargando sesion...</h1>

  return (
    <div>
      <h2>Aplicativo</h2>
      {
        isAuthenticated ? <Logout/> : <Login/>
      }
      <Profile/>
      <Cloudinary/>
    </div>
  )
}

export default App
