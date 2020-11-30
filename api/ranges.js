const Range = require('../models/Range');
const moment = require('moment');

async function getRanges() {
    return await Range.find().sort({ start: 1 });
}

async function getCurrent() {
    let now = moment();

    return await Range.find({ start: { $lte: now }, end: { $gte: now } });
}

async function create(data) {
    let start = moment(data.start + ' 00:00:00').toISOString();
    let end = moment(data.end + ' 23:59:59').toISOString();

    const range = new Range({ start: start, end: end });

    return await range.save();
}

async function update(id, data) {
    const range = await Range.findOne({ _id: id });

    if (data.start) {
        range.start = data.start;
    }

    if (data.end) {
        range.end = data.end;
    }

    return await range.save();
}

async function remove(id) {
    return await Range.deleteOne({ _id: id });
}

module.exports = {
    getCurrent,
    getRanges,
    create,
    update,
    remove
};