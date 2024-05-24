const {User,ShoppingCart}=require('../../db');


const getShoppingCart=async(req,res)=>{
  /*   try {
        const id=req.query.id
        if(!id) return res.status(400).json({message:'Faltan datos o son inválidos en el cuerpo de la solicitud'})
        const user=await User.findOne({
        where:{
        userId:id
        }

        })
        const carts= await user.getShoppingCarts()
        console.log(user);
        res.json({user,carts})        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor'});
    }
     */
    try {
        const cartTest=await ShoppingCart.create({
            cartSubtotal:2,
            cartPayment:'12345',
            isActive:true
        })
       
       
        res.json({cart:cartTest})        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor'});
    }
    
}
module.exports=getShoppingCart