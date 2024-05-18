/* const { Op } = require("sequelize");
const { Article, Category } = require('../db');

const getFill = async (req, res) => {
    try {
        const pageSize = parseInt(req.query.size, 10) || 5;
        const page = parseInt(req.query.page, 10) || 1;
        const categoryFilter = req.query.category || null;
        const stockFilter = parseInt(req.query.stock, 10) || 0;

        // Validar parámetros
        if (pageSize <= 0 || page <= 0 || stockFilter < 0) {
            return res.status(400).json({ message: 'Parámetros de consulta no válidos' });
        }

        // Construir condición "where"
        const whereCondition = {};
        if (categoryFilter) {
            whereCondition.categoryId = categoryFilter;
        }
        if (stockFilter > 0) {
            whereCondition.stock = { [Op.gte]: stockFilter };
        }

        // Obtener el conteo total
        const totalCount = await Article.count({ where: whereCondition });
        const totalPages = Math.ceil(totalCount / pageSize);

        // Obtener los resultados
        const resultados = await Article.findAll({
            where: whereCondition,
            include: {
                model: Category,
                attributes: ['categoryId', 'categoryName'],
                through: { attributes: [] }
            },
            offset: (page - 1) * pageSize,
            limit: pageSize,
            order: [['createdAt', 'DESC']] // Añadir orden por defecto
        });

        // Manejo del caso donde no se encuentran resultados
        if (resultados.length === 0) {
            return res.status(404).json({ message: 'No se han encontrado elementos con esta característica' });
        }

        // Enviar respuesta exitosa
        res.status(200).json({
            message: 'Datos obtenidos con éxito',
            totalPages,
            currentPage: page,
            result: resultados
        });
    } catch (error) {
        console.error('Error al obtener datos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = getFill; */
const { Op } = require("sequelize");
const { Article, Category } = require('../db');

const getFill = async (req, res) => {
    try {
        const pageSize = req.query.size || 5;
        const page = req.query.page || 1;
        const categoryFilter = req.query.category || null;
        const stockFilter = parseInt(req.query.stock, 10) || 0;

        // Validar parámetros
        if (pageSize <= 0 || page <= 0 || stockFilter < 0) {
            return res.status(400).json({ message: 'Parámetros de consulta no válidos' });
        }

        // Construir condición "where"
        const whereCondition = {};
        if (stockFilter > 0) {
            whereCondition.articleStock = { [Op.gte]: stockFilter };
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
            order: [['createdAt', 'DESC']] // Añadir orden por defecto
        });

        // Manejo del caso donde no se encuentran resultados
        if (resultados.length === 0) {
            return res.status(404).json({ message: 'No se han encontrado elementos con esta característica' });
        }

        // Enviar respuesta exitosa
        res.status(200).json({
            message: 'Datos obtenidos con éxito',
            totalPages,
            currentPage: page,
            result: resultados
        });
    } catch (error) {
        console.error('Error al obtener datos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = getFill;