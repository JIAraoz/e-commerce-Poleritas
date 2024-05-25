import { useAuth0 } from '@auth0/auth0-react';

import Swal from 'sweetalert2'

import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';


export default function Cart() {
    const { user } = useAuth0();
    const [userData, setUserData] = useState({});
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const userResponse = await axios.get(
                    `https://e-commerce-grupo03.onrender.com/user/user_email?email=${user.email}`
                );
                setUserData(userResponse.data.result);

                if (userResponse.data.result.userId) {
                    const cartResponse = await axios.get(`https://e-commerce-grupo03.onrender.com/cart/getShoppingCart?id=${userResponse.data.result.userId}`);
                    console.log(cartResponse.data.result);
                    if (cartResponse.data.result[0].articles) {
                        setCartItems(cartResponse.data.result[0].articles);
                    }
                }
            } catch (error) {
                alert('Ha ocurrido un error: ' + error.message);
            }
        }

	const buyCart = () => {
    // alert('Tu compra se ha realizado correctamente!');
    Swal.fire({
      title: "Good buy!",
      text: "Your purchase has been successfully completed!",
      icon: "success"
    });
		navigate('/home');
		setAllProducts([]);
	};

        fetchData();
    }, [user.email]);


    if (cartItems.length > 0) {
        return (
            <div>
                {cartItems.map((product) => (
                    <div key={product.articleId}>
                        <img src={product.articleImage} alt={product.articleName} />
                        <h2>{product.articleName}</h2>
                        <p>Precio: ${product.articlePrice}</p>
                        <p>Cantidad: {product.Cart_Articule.articleQuantity}</p>
                    </div>
                ))}
            </div>
        );
    } else {
        return (
            <div>
                <h2>No tiene ningún artículo en el carrito.</h2>
            </div>
        );
    }
}
