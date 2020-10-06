const everyDay = require('../models/every_day');

async function insertEveryDay(content) {
    const obj = await everyDay.create({
        content
    });
    return obj.toJSON();
}

async function queryEveryDay(column='id',offset=0,limit=1){
    return await everyDay.findAll({
        offset,
        limit,
        order:[
            [column,'DESC']
        ]
    });
}

module.exports = {
    insertEveryDay,
    queryEveryDay
}
