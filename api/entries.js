const Entry = require('../models/Entry');
const moment = require('moment');
const ranges = require('./ranges');

async function getRange(username, data) {
    let start = moment(data.start).utc();
    let end = moment(data.end).utc();

    return await Entry.find({ username: username, date: { $gte: start, $lte: end } }).sort({ date: 1 });
}

async function getAllEntries(username) {
    return await Entry.find({ username: username });
}

async function getCurrentRange(username) {
    let current = await ranges.getCurrent();

    if (!Object.keys(current).length) {
        return [];
    }

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