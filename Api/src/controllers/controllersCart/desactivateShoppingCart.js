const {User,ShoppingCart}=require('../../db');


const desactivateShoppingCart=async(req,res)=>{
    try {
        const cartId = req.query.cartId
        if (cartId) {
            const cartToDesactivate=await ShoppingCart.findByPk(cartId)
            if (cartToDesactivate) {
                cartToDesactivate.isActive = false
                await cartToDesactivate.save();
            }
            return res.status(200).json({message:'Carrito pagado con éxito'})
        } else {
            return res.status(400).json({message:'Faltan datos o son inválidos en el cuerpo de la solicitud'})
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor'});
    }
}
module.exports=desactivateShoppingCart