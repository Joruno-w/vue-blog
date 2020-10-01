const sequelize = require('./db');
const {DataTypes} = require('sequelize');
const blog = sequelize.define('blog',{
    title: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    views:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tags: {
        type: DataTypes.STRING(256),
        allowNull: false
    }
},{
    indexes: [
        {
            name: 'ctime',
            fields: [{
                name: 'createdAt',
                order: "DESC"
            }]
        }
    ],
    createdAt: true,
    updatedAt: true,
    freezeTableName: true,
    paranoid: true
});

module.exports = blog;
