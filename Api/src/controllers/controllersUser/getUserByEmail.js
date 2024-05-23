const {User} =require('../../db')

const getUserByEmail = async (req, res) => {
    try {
        const emailQuery = req.query.email;

        const response = await User.findOne({
            where: {
                email: emailQuery
            }
        })

        if(response){
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

module.exports = getUserByEmail