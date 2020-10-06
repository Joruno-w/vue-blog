const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('blog', 'root', '100861', {
    host: 'localhost',
    dialect: 'mysql',
    logging: null
});


module.exports = sequelize;

