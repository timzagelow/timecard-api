const db = require('../db');
const Entry = require('../models/Entry');
const moment = require('moment');

async function getRange(username, data) {
    let start = moment(data.start + ' 00:00:00').toISOString();
    let end = moment(data.end + ' 23:59:59').toISOString();

    await db.load();

    return await Entry.find({ username: username, date: { $gte: start, $lte: end } }).sort({ date: 1 });
}

async function getAllEntries(username) {
    await db.load();

    return await Entry.find({ username: username });
}

async function create(username) {
    await db.load();

    let isPunchedIn = await Entry.isPunchedIn(username);

    const type = isPunchedIn ? 'out' : 'in';

    let entry = new Entry({ username: username, type: type });

    return await entry.save();
}

async function update(id, data) {
    await db.load();

    const entry = await Entry.findOne({ _id: id });

    if (data.date) {
        entry.date = data.date;
    }

    if (data.type) {
        entry.type = data.type;
    }

    return await entry.save();
}

module.exports = {
    create,
    getAllEntries,
    getRange,
    update,
};