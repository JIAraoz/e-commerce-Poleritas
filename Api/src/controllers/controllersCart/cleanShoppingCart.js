const {Article,ShoppingCart,Cart_Articule}=require('../../db');


const cleanShoppingCart=async(req,res)=>{
    try {
        const cartId = req.query.cartId
        if (cartId) {
            const cartToClean = await ShoppingCart.findOne({
                where: {
                    cartId: cartId
                },
                include: {
                    model: Article
                }
            });
            if (cartToClean) {
                cartToClean.cartSubtotal = 0
                await Cart_Articule.destroy({
                    where: { shoppingCartCartId: cartId }
                });
                await cartToClean.save();
            }
            return res.status(200).json({message:'The shopping cart was properly cleaned'})
        } else {
            return res.status(400).json({message:'Faltan datos o son inválidos en el cuerpo de la solicitud'})
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error'});
    }
}
module.exports=cleanShoppingCart