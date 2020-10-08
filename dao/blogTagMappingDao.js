const tag_blog_mapping = require('../models/tag_blog_mapping');

async function insertTagBlogMapping(tagId,blogId) {
    const obj = await tag_blog_mapping.create({
        tagId,
        blogId
    });
    return obj.toJSON();
}

async function queryByTag(tagId,page,limit){
    return await tag_blog_mapping.findAll({
        offset: page - 1,
        limit: +limit,
        where: {
            tagId
        }
    });
}

module.exports = {
    insertTagBlogMapping,
    queryByTag
}
