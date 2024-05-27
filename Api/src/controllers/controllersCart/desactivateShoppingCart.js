const { User, ShoppingCart, Article } = require('../../db');

const desactivateShoppingCart = async (req, res) => {
    try {
        const cartId = req.query.cartId;
        if (cartId) {
            const cartToDesactivate = await ShoppingCart.findByPk(
                cartId, {
                    include: {
                        model: Article,
                        through: {
                            attributes: ['articleQuantity']
                        }
                    }
                });

            if (cartToDesactivate) {
                cartToDesactivate.isActive = false;

                for (const article of cartToDesactivate.Articles) {
                    const newStock = article.articleStock - article.Cart_Articles.articleQuantity;
                    if (newStock < 0) {
                        return res.status(400).json({ message: `Insufficient stock for the article ${article.title}` });
                    }
                }

                for (const article of cartToDesactivate.Articles) {
                    article.articleStock -= article.Cart_Articles.articleQuantity;
                    await article.save();
                }

                await cartToDesactivate.save();
                return res.status(200).json({ message: 'Cart successfully paid' });
            } else {
                return res.status(404).json({ message: 'Cart not found' });
            }
        } else {
            return res.status(400).json({ message: 'Faltan datos o son inválidos en el cuerpo de la solicitud' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = desactivateShoppingCart;