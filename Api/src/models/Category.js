const { DataTypes } = require("sequelize");

function category(sequelize) {
  sequelize.define("category", {
    categoryId: {
      type: DataTypes.NUMBER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
}

module.exports = category;
