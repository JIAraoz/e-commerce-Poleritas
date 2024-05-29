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
    articleS: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    articleL: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    articleM: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    articleXL: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    articleXXL: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
  });
}

module.exports = article;
