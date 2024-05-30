const stripe = require("stripe")(
  "sk_test_51PKnNJIDObO0roetYtw0le7i7BXIaAgXRo7Ym79WgUNorek4sdapc89WkE6KEko7qvi9PAJAdn1jPmzxDoHGPEoJ0097q55YRe",
);

const checkoutCart = async (req, res) => {
  const { id, amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Payment for Order",
      payment_method: id,
      confirm: true,
      return_url: "http://localhost:5173/home",
    });

    console.log(paymentIntent);

    res.send({ message: "successful payment" });
  } catch (error) {
    console.log(error);
    res.json({ message: error.raw.message });
  }
};

module.exports = checkoutCart;
