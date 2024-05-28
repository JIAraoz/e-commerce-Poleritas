/* const {Article,Category,Size}=require('../../db')
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
module.exports=postCreateArticle */
const { Article, Category, Size } = require('../../db');

const postCreateArticle = async (req, res) => {
    try {
        const { categoryName, articleName, articleDescription, articleImage, articlePrice, articleStock, sizes } = req.body;

        // Verificar datos requeridos
        if (!categoryName || !articleName || !articleImage || !articleDescription || !articlePrice || !articleStock||!sizes) {
            return res.status(400).json({ message: "Faltan datos o son inválidos en el cuerpo de la solicitud" });
        }

        // Buscar categoría
        const category = await Category.findOne({ where: { categoryName } });
        if (!category) {
            return res.status(400).json({ message: "Categoría no encontrada" });
        }

        // Crear artículo
        const createdArticle = await Article.create({
            articleName,
            articleDescription,
            articleImage,
            articlePrice,
            articleStock
        });

        // Asociar categoría al artículo
        await createdArticle.addCategory(category);

        // Procesar y asociar tallas (sizes)
       if (sizes && Array.isArray(sizes) && sizes.length > 0) {
            for (const sizeName of sizes) {
                let size = await Size.findOne({ where: { sizeType:sizeName } });
                await createdArticle.addSize(size);
            }
        }

        res.status(201).json({ message: 'Registro creado con éxito', results: createdArticle });

    } catch (error) {
        console.error('Error al crear registro:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = postCreateArticle;