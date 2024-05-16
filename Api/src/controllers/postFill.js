const {Article}=require('../db')
const base_articles=require('../utils/base_articles')
const postFill= async(req,res)=>{
    try {

        const createdArticles = await Article.bulkCreate(base_articles);
        res.status(201).json({ message: 'Registros creados con éxito', createdArticles });
    
    } catch (error) {
        console.error('Error al crear registros:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}
module.exports=postFill