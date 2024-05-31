const { DataTypes } = require('sequelize');

function Cart_Articule (sequelize){
    sequelize.define('Cart_Articule', {
        articleQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        tipo: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        }
    })
}

module.exports = Cart_Articule;
