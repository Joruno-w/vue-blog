const path = new Map();
const everyDayDao = require('../dao/everyDayDao');

function editEveryDay(req, res) {
    req.on('data', data => {
        everyDayDao.insertEveryDay(data.toString().trim()).then(result => {
            res.status(200).send(result);
        });
    });
}

path.set("/editEveryDay", editEveryDay);

function queryEveryDay(req, res) {
    everyDayDao.queryEveryDay().then(result => {
        res.status(200).send(result);
    });
}

path.set("/queryEveryDay", queryEveryDay);

module.exports = {
    path
}
