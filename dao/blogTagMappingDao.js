const tag_blog_mapping = require('../models/tag_blog_mapping');

async function insertTagBlogMapping(tagId,blogId) {
    const obj = await tag_blog_mapping.create({
        tagId,
        blogId
    });
    return obj.toJSON();
}

module.exports = {
    insertTagBlogMapping
}
