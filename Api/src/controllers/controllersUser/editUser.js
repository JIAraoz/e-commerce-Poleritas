const {User} = require('../../db');

const editUser = async ( req, res ) => {
    try {
        const { id } = req.query;
        const user = await User.findByPk(id);

        const updatedFields = {};
        
        if (req.query.userName) {
            updatedFields.userName = req.query.userName;
        }
        if (req.query.userImage) {
            updatedFields.userImage = req.query.userImage;
        }
        if (req.query.userDoorNumber) {
            updatedFields.userDoorNumber = req.query.userDoorNumber;
        }
        if (req.query.userStreetName) {
            updatedFields.userStreetName = req.query.userStreetName;
        }
        if (req.query.userCountry) {
            updatedFields.userCountry = req.query.userCountry;
        }
        if (req.query.userCity) {
            updatedFields.userCity = req.query.userCity;
        }

        await user.update(updatedFields);

        res.status(200).json({ message: 'User updated successfully', user });

    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Error en el servidor: '+ error.message})
    }
}

module.exports = editUser;