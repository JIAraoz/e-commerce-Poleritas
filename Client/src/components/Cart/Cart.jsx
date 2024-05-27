import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import './Cart.css'
import Swal from 'sweetalert2'

export default function Cart() {
    const { user } = useAuth0();
    const [userData, setUserData] = useState({});
    const [cartItems, setCartItems] = useState([]);
    const [cartResponse, setCartResponse] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        

        async function fetchData() {
            try {
                const userResponse = await axios.get(
                    `https://e-commerce-grupo03.onrender.com/user/user_email?email=${user.email}`
                );
                setUserData(userResponse.data.result);

                if (userResponse.data.result.userId) {
                    const cartResponse = await axios.get(
                        `https://e-commerce-grupo03.onrender.com/cart/getShoppingCart?id=${userResponse.data.result.userId}`
                    );
                    console.log(cartResponse.data)

                    const activeCart = cartResponse.data.result.find((cart) => cart.isActive === true);
                    if (activeCart && activeCart.articles) {
                        setCartItems(activeCart.articles);
                        setCartResponse(activeCart);
                    }
                }
            } catch (error) {
              // alert('Ha ocurrido un error: ' + error.message);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "An error has occurred:" + error.message,
              });
            }
        }

        fetchData();
    }, [user.email]);

    const handleRemoveButton = async (value) => {
        try {
            if (cartResponse) {
                const cartId = cartResponse.cartId;
                const response = await axios.get(
                    `https://e-commerce-grupo03.onrender.com/cart/remove_article_cart?cartid=${cartId}&articleid=${value.articleId}`
                );
    
                if (response) {
                    Swal.fire({
                        title: "Eliminated product",
                        text: "Product successfully removed!",
                        icon: "success"
                    }).then(() => {
                        window.location.reload();
                    });
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleCleanButton = async () => {
        try {
            if (cartResponse) {
                const cartId = cartResponse.cartId;
                const response = await axios.get(
                    `https://e-commerce-grupo03.onrender.com/cart/cleanShoppingCart?cartId=${cartId}`
                );
    
                if (response) {
                    Swal.fire({
                        title: "Trolley cleaned",
                        text: "Cart successfully cleaned!",
                        icon: "success"
                    }).then(() => {
                        window.location.reload();
                    });
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleBuyCart = async () => {
        try {
            if (cartResponse) {
                navigate('/checkout', { state: { cartItems, cartSubtotal: cartResponse.cartSubtotal, cartId: cartResponse.cartId } });
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (cartItems.length > 0) {
        return (
            <div className='cart-body'>
                <div className='cart'>

                {cartItems.map((product) => (
                    <div key={product.articleId} className='card-product'>
                        <div className='card-image-container'>
                        <img className='card-image' src={product.articleImage} alt={product.articleName} />
                        </div>
                        <div className='card-body'>
                        <h2>{product.articleName}</h2>
                        <p>Precio: ${product.articlePrice}</p>
                        <p>Cantidad: {product.Cart_Articule.articleQuantity}</p>
                        <button  className='remove-product' onClick={() => handleRemoveButton(product)}>Delete product</button>
                        </div>
                    </div>
                ))}
                </div>
                <div className='cart-buttons'>

                <button onClick={() => handleBuyCart()}>Buy Shopping Cart</button>
                <button onClick={() => handleCleanButton()}>Clean Shopping Cart</button>
                </div>
            </div>
        );
    } else {
        return (
            <div className='empty-cart'>
                <h2>Empty Shopping Cart.</h2>
                <Link to={'/products'}>
                    <button className='see-products'>See products</button>
                </Link>
            </div>
        );
    }
}
