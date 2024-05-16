const { DataTypes, UUID } = require('sequelize');

function user(sequelize){
    sequelize.define('user', {
        userId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userEmail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userRol: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userImage: {
            type: DataTypes.STRING,
            allowNull:false
        }
    })
}

module.exports = user