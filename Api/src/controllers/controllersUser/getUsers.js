const {User} =require('../../db')

const getUser = async(req,res) => {
    try {
        const response = await User.findAll();

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
        console.log(error)
        res.status(500).json({message:'Error en el servidor: '+ error.message})
    }
}

module.exports = getUser;