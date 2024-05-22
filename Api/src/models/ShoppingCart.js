const { DataTypes } = require("sequelize");


function shoppingCart (sequelize){
    sequelize.define('shoppingCart', {
        cartId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        cartSubtotal: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        cartPayment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cartStatus: {
            type: DataTypes.ENUM('Active', 'Inactive'),
            allowNull: false
        }
    })

}

module.exports = shoppingCart;
