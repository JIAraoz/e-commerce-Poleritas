const {User,ShoppingCart}=require('../../db')

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
            
        }      
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor'});
    }
    
}
module.exports=getShoppingCart