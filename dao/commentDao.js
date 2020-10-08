const comment = require('../models/comment');

async function insertComment(blogId, parent, parentName, userName, comments, email) {
    const obj = await comment.create({
        blogId,
        parent,
        parentName,
        userName,
        comments,
        email
    });
    return obj.toJSON();
}


async function queryCommentByBlogId(bid) {
    return await comment.findAll({
        where: {
            blogId: bid
        }
    });
}

async function queryNewComments(limit) {
    return await comment.findAll({
        order: [
            ['id', 'DESC'],
        ],
        limit: +limit
    });
}

module.exports = {
    insertComment,
    queryCommentByBlogId,
    queryNewComments
}
