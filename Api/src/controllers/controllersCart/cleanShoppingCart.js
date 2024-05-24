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
                await Cart_Articule.destroy({
                    where: { cartId: cartId }
                });
                await cartToClean.save();
            }
            return res.status(200).json({message:'Carrito limpiado'})
        } else {
            return res.status(400).json({message:'Faltan datos o son inválidos en el cuerpo de la solicitud'})
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor'});
    }
}
module.exports=cleanShoppingCart