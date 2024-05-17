const { Op } = require("sequelize")
const { Article, Category } = require('../db');

const getFill = async (req, res) => {
    try {
        const pageSize = req.query.size || 5;
        const page = req.query.page || 1;
        const categoryFilter = req.query.category || null;
        const stockFilter = req.query.stock || 0;

        const whereCondition = { stock: { [Op.gte]: stockFilter } };
        if (categoryFilter) whereCondition.categoryId = categoryFilter;

        const totalCount = await Article.count({ where: whereCondition }); 
        const totalPages = Math.ceil(totalCount / pageSize);

        const resultados = await Article.findAll({
            where: whereCondition,
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
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = getFill;