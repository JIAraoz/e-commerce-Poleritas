const { ShoppingCart, Article } = require('../../db');

const removeArticleCart = async (req, res) => {
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
            return res.status(404).json({ message: 'Shopping cart not found' });
        }

        const article = await Article.findByPk(idArticle);

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        const articleQuantity = cart.articles.find(art => art.dataValues.articleId === article.articleId)
        cart.cartSubtotal -= parseFloat((article.articlePrice * articleQuantity.Cart_Articule.articleQuantity).toFixed(2));
        await cart.save()
        await cart.removeArticle(article);

        const updatedCart = await ShoppingCart.findOne({
            where: { cartId: idCart },
            include: { model: Article }
        });

        res.status(200).json({
            message: 'Article successfully removed',
            cart: updatedCart
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

module.exports = removeArticleCart;
