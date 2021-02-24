const Range = require('../models/Range');
const moment = require('moment');

async function getRanges() {
    const ranges = await Range.find().sort({ end: -1 });

    return ranges.map(range => {
        return { _id: range._id, start: moment(range.start).format('YYYY-MM-DD'), end: moment(range.end).format('YYYY-MM-DD') };
    });
}

async function getCurrent() {
    let now = Date.now();

    let range = await Range.findOne({ start: { $lte: now }, end: { $gte: now } });

    return { _id: range._id, start: moment(range.start).format('YYYY-MM-DD'), end: moment(range.end).format('YYYY-MM-DD') };
}

async function create(data) {
    let start = moment(data.start).format('M/D/YYYY');
    let end = moment(data.end).format('M/D/YYYY');

    const range = new Range({ start: start, end: end });

    return await range.save();
}

async function update(id, data) {
    const range = await Range.findOne({ _id: id });

    if (data.start) {
        range.start = moment(data.start).format('M/D/YYYY');
    }

    if (data.end) {
        range.end = moment(data.end).format('M/D/YYYY');
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