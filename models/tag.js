const sequelize = require('./db');
const {DataTypes} = require('sequelize');
const tag = sequelize.define('tag',{
    tag: {
        type: DataTypes.STRING(64),
        allowNull: false
    }
},{
    indexes: [
        {
            fields: ['tag'],
            unique: true,
        }
    ],
    paranoid: true,
    createdAt: true,
    updatedAt: true,
    freezeTableName: true,
});


module.exports = tag;
