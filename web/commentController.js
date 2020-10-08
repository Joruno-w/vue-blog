const path = new Map();
const commentDao = require('../dao/commentDao');
const url = require('url');
const svgCaptcha = require('svg-captcha');

async function queryNewComments(req,res){
    const params = url.parse(req.url,true).query;
    commentDao.queryNewComments(parseInt(params.limit)).then(result=>{
        res.status(200).send(result);
    });
}

path.set('/queryNewComments',queryNewComments);

async function queryRandomCode(req,res){
    const captcha = svgCaptcha.create({
        color:true
    });
    res.status(200).send(captcha);
}

path.set('/queryRandomCode',queryRandomCode);

async function addComment(req,res) {
    const {bid,parent,parentName,name,content,email} = url.parse(req.url,true).query;
    commentDao.insertComment(parseInt(bid),parseInt(parent),parentName,name,content,email).then(result=>{
        res.status(200).send(result);
    });
}

path.set('/addComment',addComment);

async function queryCommentByBlogId(req,res){
    const params = url.parse(req.url,true).query;
    commentDao.queryCommentByBlogId(parseInt(params.bid)).then(result=>{
       res.status(200).send(result);
    });
}

path.set('/queryCommentByBlogId',queryCommentByBlogId);


module.exports = {
    path
}
