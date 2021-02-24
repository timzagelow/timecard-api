const Entry = require('../models/Entry');
const moment = require('moment');
const ranges = require('./ranges');

async function getRange(username, data) {
    let start = moment(data.start + ' 00:00:00').subtract(8, 'hours');
    let end = moment(data.end + ' 23:59:59').subtract(8, 'hours');

    return await Entry.find({ username: username, date: { $gte: new Date(start), $lte: new Date(end) } }).sort({ date: 1 });
}

async function getAllEntries(username) {
    return await Entry.find({ username: username });
}

async function getCurrentRange(username) {
    let current = await ranges.getCurrent();

    if (!current || !Object.keys(current).length) {
        return [];
    }

    console.log('get current');
    console.log(current);
    return await getRange(username, { start: current.start, end: current.end });
}

async function create(username) {
    let isPunchedIn = await Entry.isPunchedIn(username);

    const type = isPunchedIn ? 'out' : 'in';

    let entry = new Entry({ username: username, type: type });

    return await entry.save();
}

async function update(id, data) {
    const entry = await Entry.findOne({ _id: id });

    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            entry[key] = data[key];
        }
    }

    return await entry.save();
}

module.exports = {
    create,
    getAllEntries,
    getRange,
    getCurrentRange,
    update,
};