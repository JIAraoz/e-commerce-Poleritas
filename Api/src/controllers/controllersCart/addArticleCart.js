const { ShoppingCart, Article, Size, Cart_Articule, Article_Size } = require('../../db');

const addArticleCart = async (req, res) => {
    try {

        const { idCart, idArticle, stock, S, M, L, XL, XXL } = req.body;

        const cart = await ShoppingCart.findOne({
            where: {
                cartId: idCart
            },
            include: {
                model: Article,
            }
        });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const article = await Article.findByPk(idArticle);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        if(article.stock < 1 || 
            article.articleS < S || 
            article.articleM < M || 
            article.articleL < L || 
            article.articleXL < XL || 
            article.articleXXL < XXL){
                return res.status(404).json({
                    message: 'Article out of stock'
                });
            }
        
        const articleExist=await Cart_Articule.findOne({where:{
            articleArticleId:article.articleId,
            shoppingCartCartId:cart.cartId
        }})
        if(articleExist===null){
            const response = await Article.findByPk(idArticle);
            const subtotalAux = response.dataValues.articlePrice * parseInt(stock);
            cart.cartSubtotal += subtotalAux;
            
            await cart.save();
            await cart.addArticle(article, { through: { articleQuantity:stock, S, M, L, XL, XXL } });
        }else{
            const response = await Article.findByPk(articleExist.articleArticleId);
            const subtotalAux = parseFloat((response.dataValues.articlePrice * parseInt(stock)).toFixed(2));
            cart.cartSubtotal += subtotalAux;
            await cart.save();
            articleExist.S += S;
            articleExist.M += M;
            articleExist.L += L;
            articleExist.XL += XL;
            articleExist.XXL += XXL;
            articleExist.articleQuantity += stock;
            await articleExist.save();
        }
        const updatedCart = await ShoppingCart.findOne({
            where: { cartId: idCart },
            include: { model: Article }
        });

        res.status(200).json({
            message: 'Article successfully added to cart',
            cart: updatedCart
        });

       
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = addArticleCart;

