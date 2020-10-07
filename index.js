const express = require('express');
const config = require('./config');
const loader = require('./loader');
const app = express();
app.use('/',express.static('./page/'));
app.post('/editEveryDay',loader.get('/editEveryDay'));
app.get('/queryEveryDay',loader.get('/queryEveryDay'));
app.get('/queryBlogByPage',loader.get('/queryBlogByPage'));
app.post('/editBlog',loader.get('/editBlog'));
app.get('/queryBlogById',loader.get('/queryBlogById'));
app.get('/addComment',loader.get('/addComment'));
app.listen(config.port,()=>{
    console.log('服务器已启动！');
});
