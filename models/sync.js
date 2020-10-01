require('./blog');
require('./comment');
require('./every_day');
require('./tag');
require('./tag_blog_mapping');
const sequelize = require('./db');
(async ()=>{
    await sequelize.sync({ force: true });
    console.log("所有模型均已成功同步.");
})();

