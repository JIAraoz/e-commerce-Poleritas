const { DataTypes } = require("sequelize");

function Cart_Articule(sequelize) {
  sequelize.define("Cart_Articule", {
    articleQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    S: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    L: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    M: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    XL: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    XXL: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  });
}

module.exports = Cart_Articule;
