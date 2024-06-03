import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems, cartSubtotal, cartId } = location.state || { cartItems: [], cartSubtotal: 0 };
    
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
                    amount: cartSubtotal * 100 + 50
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
                console.error(error);
            }
        } else {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>Buy ${cartSubtotal}</button>
        </form>
    );
};

export default CheckoutForm;
