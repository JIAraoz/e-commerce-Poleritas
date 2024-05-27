import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const stripePromise = loadStripe("pk_test_51PKnNJIDObO0roetxgJeQeFOqL7Wijb9N2vnT8ajpAjccnypGLphQ8Iraa7mfQ7kJ5KkSqqAJxHmHqYibFGfGih100YQDzAHDt");

const Checkout = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default Checkout;
