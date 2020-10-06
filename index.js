const express = require('express');
const config = require('./config');
const loader = require('./loader');
const app = express();
app.use('/',express.static('./page/'));
app.post('/editEveryDay',loader.get('/editEveryDay'));
app.get('/queryEveryDay',loader.get('/queryEveryDay'));
app.listen(config.port,()=>{
    console.log('服务器已启动！');
});
