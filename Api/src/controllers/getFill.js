const {Article}=require('../db')

const getFill = async(req, res) => {
    try {
        const resultados = await Article.findAll();

        res.status(200).json({
            message: 'Datos obtenidos con exito',
            resultados
        })
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

module.exports = getFill;