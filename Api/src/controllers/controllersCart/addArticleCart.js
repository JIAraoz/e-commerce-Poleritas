const { ShoppingCart, Article } = require('../../db');

const addArticleCart = async (req, res) => {
    try {
        const idCart = req.query.cartid;
        const idArticle = req.query.articleid;

        const cart = await ShoppingCart.findOne({
            where: {
                cartId: idCart
            },
            include: {
                model: Article
            }
        });

        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        const article = await Article.findByPk(idArticle);
        if (!article) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }

        await cart.addArticle(article);

        const updatedCart = await ShoppingCart.findOne({
            where: { cartId: idCart },
            include: { model: Article }
        });

        res.status(200).json({
            message: 'Artículo agregado al carrito con éxito',
            cart: updatedCart
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

module.exports = addArticleCart;

