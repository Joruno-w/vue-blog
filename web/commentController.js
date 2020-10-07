const path = new Map();
const commentDao = require('../dao/commentDao');
const url = require('url');

async function addComment(req,res) {
    const {bid,parent,name,content,email} = url.parse(req.url,true).query;
    commentDao.insertComment(parseInt(bid),parseInt(parent),name,content,email).then(result=>{
        res.status(200).send(result);
    });
}

path.set('/addComment',addComment);


module.exports = {
    path
}
