const path = new Map();
const url = require('url');
const blogDao = require('../dao/blogDao');
const tagsDao = require('../dao/tagsDao');
const tag_blog_mapping = require('../dao/blogTagMappingDao');
async function queryBlogById(req,res){
    const params = url.parse(req.url,true).query;
    blogDao.queryBlogById(parseInt(params.bid)).then(result=>{
        res.status(200).send(result);
    });
}

path.set('/queryBlogById',queryBlogById);

async function queryBlogByPage(req,res){
    const query = url.parse(req.url,true).query;
    blogDao.queryBlogByPage(parseInt(query.page),parseInt(query.limit)).then(result=>{
         res.status(200).send(result);
    });
}

path.set('/queryBlogByPage',queryBlogByPage);

async function editBlog(req,res){
    let {title,tags} = url.parse(req.url,true).query;
    tags = tags.replace(/\s/g,'').replace('，',',');
    req.on('data',data=>{
        blogDao.insertBlog(title,data.toString(),tags).then(result=>{
            res.status(200).send(result);
            const blogId = result.id;
            const tagList = tags.split(",");
            for (let i = 0;i < tagList.length;i ++){
                if (tagList[i] === ''){
                    continue;
                }
                queryTag(tagList[i],blogId);
            }
        });
    });
}

path.set('/editBlog',editBlog);

function queryTag(tag,blogId){
    tagsDao.queryTag(tag).then(res=>{
        if (!res){
            insertTag(tag,blogId)
        }else{
            insertTagBlogMapping(res.id,blogId);
        }
    });
}

function insertTag(tag,blogId){
    tagsDao.insertTag(tag).then(res=>{
        console.log(res);
        insertTagBlogMapping(res.id,blogId);
    });
}

function insertTagBlogMapping(tagId,blogId){
    tag_blog_mapping.insertTagBlogMapping(tagId,blogId).then(res=>{});
}

module.exports = {
    path
}
