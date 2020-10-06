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


async function queryBlogByPage(page,limit){
    return await blog.findAll({
        offset: page,
        limit,
    });
}

module.exports = {
    insertBlog,
    queryBlogByPage
}
