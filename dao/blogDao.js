const blog = require('../models/blog');

async function insertBlog(title,content,tags,views=0) {
    const obj = await blog.create({
        title,
        content,
        views,
        tags
    });
    return obj.toJSON();
}

module.exports = {
    insertBlog
}
