const { DataTypes } = require('sequelize');

function Cart_Articule (sequelize){
    sequelize.define('Cart_Articule', {
        articleQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
}

module.exports = Cart_Articule;
