const {User} =require('../../db')
const postUser=async(req,res)=>{
    try {
        if (!req.body.userName||!req.body.userEmail||!req.body.userImage) {
            res.status(400).json({message:"Faltan datos o son inválidos en el cuerpo de la solicitud"})
        }
        else{
            const userCheck= await User.findOne({
                where:{
                    userEmail:req.body.userEmail
                }
            })
            if (userCheck===null) {
                const user={
                    userName:req.body.userName,
                    userEmail:req.body.userEmail,
                    userImage:req.body.userImage,
                    userRol:req.body.userRol||'Admin'
                }
                
                const createdUser= await User.create(user)
                res.status(201).json({
                    result:createdUser
                })
            }else{
                res.status(200).json({
                    result:userCheck
                })
            }

          

        }
       
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Error en el servidor: '+ error.message})
    }
}
module.exports=postUser