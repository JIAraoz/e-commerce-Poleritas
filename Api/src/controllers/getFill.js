
const {Article,Category}=require('../db')

const getFill = async(req, res) => {
    try {
        const resultados = await Article.findAll({include:{
            model: Category, 
            
            attributes: ['id', 'name'],
            through: { attributes: [] }
        }});
        if (resultados.length === 0) {
            return res.status(400).json({ message: 'los datos no existen se deben crear' });
        }
        res.status(200).json({
            message: 'Datos obtenidos con exito',
            resultados
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

module.exports = getFill;