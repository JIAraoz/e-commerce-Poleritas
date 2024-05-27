const { ShoppingCart, Article,Cart_Articule } = require('../../db');

const addArticleCart = async (req, res) => {
    try {
        const idCart = req.query.cartid;
        const idArticle = req.query.articleid;
        const quantity = parseInt(req.query.quantity, 10);

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
        const articleExist=await Cart_Articule.findOne({where:{
            articleArticleId:article.articleId,
            shoppingCartCartId:cart.cartId

        }})
        if(articleExist===null){
            await cart.addArticle(article, { through: { articleQuantity:quantity } });
        }else{
            articleExist.articleQuantity += quantity;
            await articleExist.save();
        }
        const subtotalAux = articleExist.articlePrice * parent(quantity);
        cart.subtotal += subtotalAux;
        await cart.save();
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

