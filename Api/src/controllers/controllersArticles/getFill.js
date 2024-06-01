const { Op } = require("sequelize");
const { Article, Category } = require('../../db');

const getFill = async (req, res) => {
    try {
        const pageSize = parseInt(req.query.size, 10) || 5;
        const page = parseInt(req.query.page, 10) || 1;
        const categoryFilter = req.query.category || null;
        const stockFilter = parseInt(req.query.stock, 10) || 0;
        const order = req.query.order || null;
        const nameFilter = req.query.name || '';
        const sizeFilter = req.query.sizeFilter || null; // Nuevo filtro de talla única

        // Validar parámetros
        if (pageSize <= 0 || page <= 0 || stockFilter < 0) {
            return res.status(400).json({ message: 'Invalid query parameters' });
        }

        // Construir condición "where"
        const whereCondition = {};
        if (stockFilter > 0) {
            whereCondition.articleStock = { [Op.gte]: stockFilter };
        }
        if (nameFilter.length !== 0) {
            whereCondition.articleName = {
                [Op.iLike]: `%${nameFilter}%`
            };
        }

        // Filtrar por talla única
        if (sizeFilter) {
            switch (sizeFilter) {
                case 'S':
                    whereCondition.articleS = { [Op.gt]: 0 };
                    break;
                case 'M':
                    whereCondition.articleM = { [Op.gt]: 0 };
                    break;
                case 'L':
                    whereCondition.articleL = { [Op.gt]: 0 };
                    break;
                case 'XL':
                    whereCondition.articleXL = { [Op.gt]: 0 };
                    break;
                case 'XXL':
                    whereCondition.articleXXL = { [Op.gt]: 0 };
                    break;
                default:
                    return res.status(400).json({ message: 'Invalid size filter' });
            }
        }

        // Definir ordenación
        let orderCondition = [];
        switch (order) {
            case 'A-Z':
                orderCondition = [['articleName', 'ASC']];
                break;
            case 'Z-A':
                orderCondition = [['articleName', 'DESC']];
                break;
            case 'price-asc':
                orderCondition = [['articlePrice', 'ASC']];
                break;
            case 'price-desc':
                orderCondition = [['articlePrice', 'DESC']];
                break;
            default:
                orderCondition = [['createdAt', 'DESC']]; // Orden por defecto
        }

        // Obtener el conteo total
        const totalCount = await Article.count({
            where: whereCondition,
            include: categoryFilter ? {
                model: Category,
                where: { categoryId: categoryFilter },
                through: { attributes: [] }
            } : null
        });

        const totalPages = Math.ceil(totalCount / pageSize);

        // Obtener los resultados
        const resultados = await Article.findAll({
            where: whereCondition,
            include: {
                model: Category,
                attributes: ['categoryId', 'categoryName'],
                where: categoryFilter ? { categoryId: categoryFilter } : {},
                through: { attributes: [] }
            },
            offset: (page - 1) * pageSize,
            limit: pageSize,
            order: orderCondition
        });

        // Manejo del caso donde no se encuentran resultados
        if (resultados.length === 0) {
            return res.status(404).json({ message: 'No elements with this characteristic have been found' });
        }

        // Enviar respuesta exitosa
        res.status(200).json({
            message: 'Data successfully obtained',
            totalPages,
            currentPage: page,
            result: resultados
        });
    } catch (error) {
        console.error('Error al obtener datos:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = getFill;