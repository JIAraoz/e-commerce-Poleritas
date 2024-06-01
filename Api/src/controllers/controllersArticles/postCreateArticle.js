const { Article, Category, Size, Article_Size } = require('../../db');
const postCreateArticle = async (req, res) => {
    try {
        let { categoryName, articleName, articleDescription, articleImage, articlePrice, articleStock, articleS,articleM,articleL,articleXL,articleXXL} = req.body;
        if (( articleS + articleM + articleL + articleXL + articleXXL ) === 0) articleStock = 0;

        // Verificar datos requeridos
        if (!categoryName || !articleName || !articleImage || !articleDescription || !articlePrice || !articleStock) {
            return res.status(400).json({ message: "Data is missing or invalid in the article creation form" });
        }

        // Buscar categoría
        const category = await Category.findOne({ where: { categoryName } });
        if (!category) {
            return res.status(400).json({ message: "An error occurred while obtaining the categories" });
        }

        // Crear artículo
        const createdArticle = await Article.create({
            articleName,
            articleDescription,
            articleImage,
            articlePrice,
            articleStock,
            articleS,
            articleM,
            articleL,
            articleXL,
            articleXXL,
            isActive:true

        });

        // Asociar categoría al artículo
        await createdArticle.addCategory(category);

        // Procesar y asociar tallas (sizes)
     
     

        res.status(201).json({ message: 'Record created successfully', results: createdArticle });

    } catch (error) {
        console.error('Error al crear registro:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = postCreateArticle;