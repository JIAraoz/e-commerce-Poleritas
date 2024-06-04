/* eslint-disable react/prop-types */
import { useState,useEffect } from "react"
import axios from "axios"
export default function UsersSearchBar({setUsers}){
    const [email,setEmail]=useState('')
    useEffect(() => {
		axios
			.get('https://e-commerce-grupo03.onrender.com/user/list-users')
			.then((response) => {
				if (response.data && Array.isArray(response.data.result)) {
                    console.log('se setearon los user');
					setUsers(response.data.result);
				} else {
					console.error(
						'La API no devolvió un array en la propiedad result: ',
						response.data,
					);
				}
			})
			.catch((error) => {
				console.error('Hubo un error al obtener los usuarios: ', error);
			});
	}, []);

    const handleChange=(e)=>{
        setEmail(e.target.value)
    }
    const handleSearch = () => {
        axios.get(`https://e-commerce-grupo03.onrender.com/user/list-users?userEmail=${email}`).then(({data})=>{
            console.log('sebusco');
            setUsers(data.result)
        })
      };

    return(<>
      
        <input
        type='search'
        onChange={handleChange}
        value={email}
        placeholder='Buscar por email...'
        />
      <button onClick={() => handleSearch()}>
      </button>
        </>
    )
}