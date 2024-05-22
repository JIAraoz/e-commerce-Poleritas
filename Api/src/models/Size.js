const { DataTypes } = require('sequelize');

function size (sequelize){
    sequelize.define('size', {
        sizeId: {
            sizyId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            sizeType: {
                type: DataTypes.STRING,
                allowNull: false
            },
        }
    })
}

module.exports = size;