const { DataTypes } = require("sequelize");

function shoppingCart(sequelize) {
  sequelize.define("shoppingCart", {
    cartId: {
      type: DataTypes.NUMBER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    cartQuantity: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    cartSubtotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    cartPayment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
}

module.exports = shoppingCart;
