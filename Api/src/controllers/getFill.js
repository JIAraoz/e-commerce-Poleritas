
const { Article, Category } = require('../db');

const getFill = async (req, res) => {
    try {
        const pageSize = 5;
        const page = req.query.page || 1; 

        const totalCount = await Article.count(); 
        const totalPages = Math.ceil(totalCount / pageSize);

        const resultados = await Article.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: {
                model: Category,
                attributes: ['categoryId', 'categoryName'],
                through: { attributes: [] }
            },
            offset: (page - 1) * pageSize, 
            limit: pageSize 
        });

        if (resultados.length === 0) {
            return res.status(404).json({ message: 'No se han encontrado elementos con esta característica' });
        }

        res.status(200).json({
            message: 'Datos obtenidos con éxito',
            totalPages,
            currentPage: page,
            result:resultados
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = getFill;