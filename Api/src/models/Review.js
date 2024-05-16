const { DataTypes } = require('sequelize');

function review (sequelize){
    sequelize.define('review', {
        reviewId: {
            type: DataTypes.NUMBER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        reviewRating: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        reviewDescription: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    })
}

module.exports = review;