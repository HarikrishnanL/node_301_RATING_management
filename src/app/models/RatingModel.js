const Sequelize = require("sequelize");
const ratingStatus= require("../domain/enumerations/ratingStatus");
const db = require("../config/database");

const RatingModel = db.define('rating',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    reviewComments:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    rating:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    restaurantId:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    customerId:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    status: {
        type: Sequelize.INTEGER,
        defaultValue: ratingStatus.Active
    },
},{
    freezeTableName:true
});

module.exports = RatingModel;