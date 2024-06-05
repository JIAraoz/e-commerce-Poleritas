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
    const [zip, setZip] = useState('');
    const [showZip, setShowZip] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [formData, setFormData] = useState({
        userDoorNumber: '',
        userStreetName: '',
        userCountry: '',
        userCity: ''
    });

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

                if (!userResponse.data.result.userDoorNumber || !userResponse.data.result.userStreetName || !userResponse.data.result.userCountry || !userResponse.data.result.userCity) {
                    setIsEditingAddress(true);
                } else {
                    setFormData({
                        userDoorNumber: userResponse.data.result.userDoorNumber,
                        userStreetName: userResponse.data.result.userStreetName,
                        userCountry: userResponse.data.result.userCountry,
                        userCity: userResponse.data.result.userCity
                    });
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
                    elements.getElement(CardElement).clear();

                    Swal.fire({
                        title: 'Compra Exitosa!',
                        text: 'Muchas gracias por su compra. Le invitamos a dejar una review acerca de la pagina en su perfil.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate('/home');
                        }
                    });

                    try {
                        await axios.get(`https://e-commerce-grupo03.onrender.com/cart/desactivateShoppingCart?cartId=${cartId}`);
                    } catch (error) {
                        console.error(error);
                    }
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "An error has occurred:" + error.message,
                });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "An error has occurred:" + error.message,
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleEditAddressClick = () => {
        setIsEditingAddress(true);
    };

    return (
        <div className="checkout-form">
            <div className="left-section">
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
            </div>
            <div className="separator"></div>
            <div className="right-section">
                <h2>Checkout</h2>
                {userData && (
                    <div className="user-details">
                        <h3>User Details</h3>
                        <p><strong>Name:</strong> {userData.userName}</p>
                        <p><strong>Email:</strong> {userData.userEmail}</p>
                        {!isEditingAddress ? (
                            <>
                                <p><strong>Door Number:</strong> {userData.userDoorNumber || 'Not provided'}</p>
                                <p><strong>Street Name:</strong> {userData.userStreetName || 'Not provided'}</p>
                                <p><strong>Country:</strong> {userData.userCountry || 'Not provided'}</p>
                                <p><strong>City:</strong> {userData.userCity || 'Not provided'}</p>
                                <button className='btnSave' onClick={handleEditAddressClick}>Edit Address</button>
                            </>
                        ) : (
                            <div className="address-edit-form">
                                <h4>Edit Address</h4>
                                <label>
                                    Door Number:
                                    <input
                                        type="text"
                                        name="userDoorNumber"
                                        value={formData.userDoorNumber}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Street Name:
                                    <input
                                        type="text"
                                        name="userStreetName"
                                        value={formData.userStreetName}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Country:
                                    <input
                                        type="text"
                                        name="userCountry"
                                        value={formData.userCountry}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    City:
                                    <input
                                        type="text"
                                        name="userCity"
                                        value={formData.userCity}
                                        onChange={handleInputChange}
                                    />
                                </label>
                            </div>
                        )}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="card-element-wrapper">
                        <CardElement className='elementosCard'/>
                    </div>
                    <button className='btnSave' type="submit" disabled={!stripe}>
                        Buy ${cartSubtotal}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CheckoutForm;
