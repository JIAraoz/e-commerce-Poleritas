const stripe = require('stripe')('sk_test_51PKnNJIDObO0roetYtw0le7i7BXIaAgXRo7Ym79WgUNorek4sdapc89WkE6KEko7qvi9PAJAdn1jPmzxDoHGPEoJ0097q55YRe');
const { ShoppingCart, Article, transporter} = require('../../db');

const checkoutCart = async (req, res) => {
   
    const { id, amount, email, cartItems } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Payment for Order",
            payment_method: id,
            confirm: true,
            return_url: "http://localhost:5173/home"
        });
        

        if(paymentIntent){
            const info = await transporter.sendMail({
                from: '"Thanks you for your order!" <poleritas0@gmail.com>', // sender address
                to: email,
                subject: "Your order",
                html: `
                    <p>Thank you for your order!</p>
                    <p>Here are the items you purchased:</p>
                    <ul>
                        ${cartItems.map(item => `
                            <li>
                                <div>
                                    <img src="${item.articleImage}" alt="item" style="width: 100px; height: 100px; object-fit: cover;">
                                </div>
                                <div>
                                    <p><strong>Name:</strong> ${item.articleName}</p>
                                    <p><strong>Price:</strong> ${item.articlePrice}</p>
                                </div>
                            </li>
                        `).join('')}
                    </ul>
                `
            });
            return res.send({ 
                message: 'successful payment',
                amount: amount
             });
        }else
            return  res.status(406).send({ message: 'Payment declined'})
    } catch (error) {
        console.log(error);
        res.json({ message: error.raw.message });
    }
}

module.exports = checkoutCart;
