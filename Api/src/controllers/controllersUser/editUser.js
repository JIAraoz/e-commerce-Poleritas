const { User } = require('../../db');

const editUser = async (req, res) => {
    try {
        const { id } = req.query;
        const user = await User.findByPk(id);

        const updatedFields = {};
        
        if (req.body.userName) {
            updatedFields.userName = req.body.userName;
        }
        if (req.body.userImage) {
            updatedFields.userImage = req.body.userImage;
        }
        if (req.body.userDoorNumber) {
            updatedFields.userDoorNumber = req.body.userDoorNumber;
        }
        if (req.body.userStreetName) {
            updatedFields.userStreetName = req.body.userStreetName;
        }
        if (req.body.userCountry) {
            updatedFields.userCountry = req.body.userCountry;
        }
        if (req.body.userCity) {
            updatedFields.userCity = req.body.userCity;
        }

        await user.update(updatedFields);

        res.status(200).json({ message: 'User updated successfully', user });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
}

module.exports = editUser;
