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
        offset: (page - 1) * limit,
        limit: +limit
    });
}

async function queryBlogById(id){
    return await blog.findByPk(id);
}

async function queryAllBlog(){
    return await blog.findAll();
}

async function addViews(id){
    const views = await queryBlogById(id).then(res=>res.dataValues.views);
    await blog.update({views: views + 1},{
        where: {
            id
        }
    });
}

async function queryHotBlog(limit){
    return await blog.findAll({
        order: [
            ['views','DESC']
        ],
        limit: +limit
    });
}


module.exports = {
    insertBlog,
    queryBlogByPage,
    queryBlogById,
    queryAllBlog,
    addViews,
    queryHotBlog
}
