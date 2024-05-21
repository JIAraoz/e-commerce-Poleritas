const { DataTypes } = require("sequelize");

function article(sequelize) {
  sequelize.define("article", {
    articleId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    articleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    articleDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    articlePrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    articleImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    articleStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
}

module.exports = article;
