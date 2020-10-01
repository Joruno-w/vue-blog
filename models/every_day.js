const sequelize = require('./db');
const {DataTypes} = require('sequelize');
const everyDay = sequelize.define('every_day',{
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},{
    indexes:[
        {
            name: 'ctime',
            fields: [{
                name: 'createdAt',
                order: "DESC"
            }],
        }
    ],
    freezeTableName: true,
    createdAt: true,
    updatedAt: false,
    paranoid: true
});


module.exports = everyDay;
