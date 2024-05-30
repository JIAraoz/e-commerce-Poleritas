const { DataTypes } = require("sequelize");

function shoppingCart(sequelize) {
  sequelize.define("shoppingCart", {
    cartId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    cartSubtotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    cartPayment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
}

module.exports = shoppingCart;
