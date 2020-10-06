const tags = require('../models/tag');

async function insertTag(tag) {
    const obj = await tags.create({
       tag
    });
    return obj.toJSON();
}


async function queryTag(tag) {
    return await tags.findOne({
        where: {
            tag
        }
    });
}


module.exports = {
    insertTag,
    queryTag
}
