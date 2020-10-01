const sequelize = require('./db');
const {DataTypes} = require('sequelize');
const tagBlogMapping = sequelize.define('tag_blog_mapping',{
    tagId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    blogId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    indexes: [
        {
            fields: ['tagId'],
            name: 'tag_blog_id',
        },
        {
            fields: ['blogId'],
            name: 'blog_tag_id'
        }
    ],
    createdAt: true,
    updatedAt: true,
    paranoid: true,
    freezeTableName: true
});

module.exports = tagBlogMapping;
