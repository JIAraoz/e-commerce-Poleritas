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
    S: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    L: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    M: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    XL: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    XXL: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
  });
}

module.exports = article;

