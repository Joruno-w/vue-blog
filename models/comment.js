const sequelize = require('./db');
const {DataTypes} = require('sequelize');
const comment = sequelize.define('comment', {
    blogId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    parent: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    parentName: {
        type: DataTypes.STRING(64),
        allowNull: true,
        defaultValue: '0'
    },
    userName: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    comments: {
        type: DataTypes.STRING(256),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(128),
        allowNull: false
    }
}, {
    indexes: [
        {
            fields: ['blogId'],
        }
    ],
    createdAt: true,
    updatedAt: true,
    paranoid: true,
    freezeTableName: true,
});

module.exports = comment;
