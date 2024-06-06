const { ShoppingCart, Article,  Cart_Articule} = require('../../db');

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

                for (const article of cartToDesactivate.articles) {
                    const newStock = article.articleStock - article.Cart_Articule.articleQuantity;
                    if (newStock < 0) {
                        return res.status(400).json({ message: `Insufficient stock for the article ${article.title}` });
                    }
                }

                for (const article of cartToDesactivate.articles) {
                    article.S -= article.Cart_Articule.S;
                    article.M -= article.Cart_Articule.M;
                    article.L -= article.Cart_Articule.L;
                    article.XL -= article.Cart_Articule.XL;
                    article.XXL -= article.Cart_Articule.XXL;
                    article.articleStock -= article.Cart_Articule.articleQuantity;
                    await article.save();
                }

                await cartToDesactivate.save();
                return res.status(200).json({ message: 'Cart successfully paid' });
            } else {
                return res.status(404).json({ message: 'Cart not found' });
            }
        } else {
            return res.status(400).json({ message: 'Missing or invalid data in the request body' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = desactivateShoppingCart;