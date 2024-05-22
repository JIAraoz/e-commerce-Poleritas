const {Category}=require("../db")
const postCategory=async(req,res)=>{
    try {
        const categoryName=req.query.categoryName
        if (!categoryName) {
            res.status(400).json({message:'Error en la request: query category no esta definida'})
        }else{
            await Category.create({categoryName})
            res.status(201).json({message:'Category creada con éxito'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Ha ocurrido un error por parte del servidor: '+error.message})
    }
  
}
module.exports=postCategory