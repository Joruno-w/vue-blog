const path = new Map();
const tagsDao = require('../dao/tagsDao');
const blogDao = require('../dao/blogDao');
const url = require('url');
const tag_blog_mapping = require('../dao/blogTagMappingDao');
async function queryRandomTag(req,res){
    tagsDao.queryAllTags().then(result=>{
        res.status(200).send(result);
    });
}

path.set('/queryRandomTag',queryRandomTag);

async function queryByTag(req,res){
    const params = url.parse(req.url,true).query;
    tagsDao.queryTag(params.tag).then(result=>{
        if (result == null || result.length === 0){
            res.status(200).send(result);
        }else{
            tag_blog_mapping.queryByTag(parseInt(result.dataValues.id),parseInt(params.page),parseInt(params.limit)).then(resp=>{
                blogDao.queryBlogById(resp[0].dataValues.blogId).then(data=>{
                    res.status(200).send(data);
                })
            });
        }
    });
}

path.set('/queryByTag',queryByTag);

module.exports = {
    path
}
