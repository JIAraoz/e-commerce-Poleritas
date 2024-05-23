const {Article,Category}=require('../db')
const postCreateArticle=async(req,res)=>{
    try {
    
        const category = await Category.findAll({where:{categoryName:req.body.Category}})
        const {articleName,articleDescription,articleImage,articlePrice,articleStock}=req.body
        if(!category||!articleName||!articleImage||!articleDescription||!articlePrice||!articleStock){res.status(400).json({message:"Faltan datos o son inválidos en el cuerpo de la solicitud"})}
        else{
        const createdArticle=await Article.create({articleName,articleDescription,articleImage,articlePrice,articleStock})
        await createdArticle.addCategory(category)
        res.status(201).json({ message: 'Registro creado con éxito',results:createdArticle})
        }

    } catch (error) {
        console.error('Error al crear registro:', error);
        res.status(500).json({ message: 'Error interno del servidor'});
    }

}
module.exports=postCreateArticle