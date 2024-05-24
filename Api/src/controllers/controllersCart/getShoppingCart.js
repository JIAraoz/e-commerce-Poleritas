const {User,ShoppingCart}=require('../../db')

const getShoppingCart=async(req,res)=>{
    try {
        const id=req.query.id
        if(!id) return res.status(400).json({message:'Faltan datos o son inválidos en el cuerpo de la solicitud'})
        const user=await User.findOne({
        where:{
        userId:id
        }

        })
        console.log(user);
        res.json({user})        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor'});
    }
    
}
module.exports=getShoppingCart