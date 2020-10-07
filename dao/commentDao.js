const comment = require('../models/comment');

async function insertComment(blogId,parent,userName,comments,email) {
    const obj = await comment.create({
        blogId,
        parent,
        userName,
        comments,
        email
    });
    return obj.toJSON();
}

module.exports = {
    insertComment
}
