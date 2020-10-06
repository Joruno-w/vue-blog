const fs = require('fs');
const conf = fs.readFileSync('./server.conf').toString().trim().split("\r\n");
const config = {};
for (let i = 0;i < conf.length; i++){
    config[conf[i].split("=")[0]] = conf[i].split("=")[1];
}
module.exports = config;
