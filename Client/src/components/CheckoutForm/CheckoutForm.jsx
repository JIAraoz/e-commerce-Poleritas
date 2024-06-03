import { useAuth0 } from '@auth0/auth0-react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import "./CheckoutForm.css";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems, cartSubtotal, cartId } = location.state || { cartItems: [], cartSubtotal: 0 };

    const { user } = useAuth0();
    const [userData, setUserData] = useState({});
    const [cartResponse, setCartResponse] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const userResponse = await axios.get(
                    `https://e-commerce-grupo03.onrender.com/user/user_email?email=${user.email}`
                );
                setUserData(userResponse.data.result);

                if (userResponse.data.result.userId) {
                    const cartResponse = await axios.get(
                        `https://e-commerce-grupo03.onrender.com/cart/getShoppingCart?id=${userResponse.data.result.userId}`,
                    );
                    setCartResponse(cartResponse.data.result);
                    console.log(cartResponse.data.result.articles);
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "An error has occurred:" + error.message,
                });
            }
        }
        fetchData();
    }, [user.email]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        });

        if (!error) {
            const { id } = paymentMethod;

            try {
                const { data } = await axios.post('https://e-commerce-grupo03.onrender.com/cart/checkout', {
                    id,
                    amount: cartSubtotal * 100 + 50 // Ajuste de cantidad en centavos
                });

                console.log(data);
                if (data.message === 'successful payment') {
                    navigate('/home');

                    try {
                        await axios.get(`https://e-commerce-grupo03.onrender.com/cart/desactivateShoppingCart?cartId=${cartId}`);
                    } catch (error) {
                        console.error(error);
                    }
                }

                elements.getElement(CardElement).clear();
            } catch (error) {
                console.error(error);
            }
        } else {
            console.error(error);
        }
    };

    return (
        <div className="checkout-form">
            <h2>Checkout</h2>
            {userData && (
                <div className="user-details">
                    <h3>User Details</h3>
                    <p><strong>Name:</strong> {userData.userName}</p>
                    <p><strong>Email:</strong> {userData.userEmail}</p>
                </div>
            )}
            {cartResponse && cartResponse.articles.length > 0 ? (
                <div className="cart-summary">
                    <h3>Cart Summary</h3>
                    <ul>
                        {cartResponse.articles.map((article, index) => (
                            <li key={index}>
                                <img src={article.articleImage} alt="item" />
                                {article.articleName} - ${article.articlePrice}
                            </li>
                        ))}
                    </ul>
                    <h4>Subtotal: ${cartSubtotal}</h4>
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
            <form onSubmit={handleSubmit}>
                <div className="card-element-wrapper">
                    <CardElement />
                </div>
                <button type="submit" disabled={!stripe}>
                    Buy ${cartSubtotal}
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;


