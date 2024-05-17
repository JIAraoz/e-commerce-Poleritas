const { Category } = require('../db');

const getCategory = async (req, res) =>{
    try {
        const response = await Category.findAll({
            attributes: ['categoryId', 'categoryName']
        });

        res.status(200).json({
            message: 'Datos obtenidos con éxito',
            result: response
        });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

module.exports = getCategory;
