const { DataTypes } = require('sequelize');

function Article_Size (sequelize){
    sequelize.define('Article_Size', {
        sizeQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
}

module.exports = Article_Size;