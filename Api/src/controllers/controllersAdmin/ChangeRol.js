const { User } = require('../../db');

const ChangeRol = async (req, res) => {
    try {
        const { id, rol } = req.query;

       
        const validRoles = ["Admin", "User", "Banned"];
        if (!validRoles.includes(rol)) {
            return res.status(400).json({ message: "Invalid role" });
        }

    
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

       
        user.userRol = rol;
        await user.save();

        return res.status(200).json({ message: "Role updated successfully", user });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = ChangeRol;