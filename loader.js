const fs = require('fs');
const pathMap = new Map();
const config = require('./config');
const controllerSet = [];
const files = fs.readdirSync(config["web_path"]);

for (let i = 0;i < files.length;i ++){
    const file = require(`./${config["web_path"]}/${files[i]}`);
    if (file.path){
        for (const [key,value] of file.path){
            if (pathMap.get(key) == null){
                pathMap.set(key,value);
            }else{
                throw new Error("url error" + key);
            }
        }
        controllerSet.push(file);
    }
}

module.exports = pathMap;
