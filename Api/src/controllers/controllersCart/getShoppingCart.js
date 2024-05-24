/* const {User,ShoppingCart}=require('../../db')

const getShoppingCart=async(req,res)=>{
    try {
        const id=req.query.id
        if(!id) return res.status(400).json({message:'Faltan datos o son inválidos en el cuerpo de la solicitud'})
        const userCard=await User.findOne({
        where:{
        userId:id
        },
        include:{
            model: ShoppingCart,
           
        }

        })
        if(userCard===null){
            const user=await findOne({where:{
                userId:id
            }})
            if (user===null) {
                return res.status(400).json({message:'No se encontro el usuario'})
            }else{
                const shoppingCart=await ShoppingCart.create({
                    cartSubtotal:0,
                    cartPayment:"None",
                    isActive:true
                })
                await user.addShoppingCart(shoppingCart)
                const updatedUser = await User.findOne({
                    where: { userId: id },
                    include: { model: ShoppingCart }
                });
                return res.status(200).json({result:updatedUser})
            }
            
        }else{
            res.status(200).json({result:userCard})  

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor'});
    }
    
}
module.exports=getShoppingCart */
const { User, ShoppingCart } = require('../../db');

const getShoppingCart = async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) return res.status(400).json({ message: 'Faltan datos o son inválidos en el cuerpo de la solicitud' });

        // Buscar el usuario con sus carritos
        const userCard = await User.findOne({
            where: { userId: id },
            include: { model: ShoppingCart }
        });

        if (userCard === null) {
            // Si no se encuentra el usuario con carrito, buscar el usuario sin carrito
            const user = await User.findOne({ where: { userId: id } });
            if (user === null) {
                return res.status(400).json({ message: 'No se encontró el usuario' });
            } else {
                // Crear un nuevo carrito para el usuario
                const shoppingCart = await ShoppingCart.create({
                    cartSubtotal: 0,
                    cartPayment: "None",
                    cartStatus: 'Active', // Asegúrate de que este campo existe y es correcto
                    userUserId: user.userId // Asocia el carrito al usuario
                });
                await user.addShoppingCart(shoppingCart);
                
                // Volver a buscar el usuario con el carrito recién creado
                const updatedUser = await User.findOne({
                    where: { userId: id },
                    include: { model: ShoppingCart }
                });
                return res.status(200).json({ result: updatedUser.shoppingCarts });
            }
        } else {
            // Si el usuario ya tiene carritos
            return res.status(200).json({ result: userCard.shoppingCarts });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = getShoppingCart;