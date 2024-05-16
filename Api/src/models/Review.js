const { DataTypes } = require('sequelize');

function review (sequelize){
    sequelize.define('review', {
        reviewId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        reviewRating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        reviewDescription: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    })
}

module.exports = review;