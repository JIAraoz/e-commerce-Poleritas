import { useAuth0 } from "@auth0/auth0-react"

const Profile = () => {
    const { user, isAuthenticated } = useAuth0()

    return (
        isAuthenticated && (
        <div>
            <img src = {user.picture} alt = {user.name} />
            <h2>Nombre: {user.name}</h2>
            <p>Correo: {user.email}</p>
        </div>
        )
    )
}

export default Profile