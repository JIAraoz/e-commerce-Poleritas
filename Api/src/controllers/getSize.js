const { Size } = require('../db');
const size = require('../models/Size');

const getSize = async (req, res) =>{
    try {
        const response = await Size.findAll({
            attributes: ['sizeId', 'sizeType']
        });
        console.log(response);
        if(response.length!==0){
            res.status(200).json({
                message: 'Datos obtenidos con éxito',
                result: response
            });
        }else{
            return res.status(404).json({ message: 'No se han encontrado elementos con esta característica' })
        }
        

    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

module.exports = getSize;