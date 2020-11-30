const { PaidTime, PaidTimeLog } = require('../models/PaidTime');
const moment = require('moment');
const createHttpError = require("http-errors");

async function create(username, data) {
    const available = await PaidTime.findOne({ username: username}, 'available');

    if (!available || (available && available < 1)) {
        throw createHttpError(404, 'No paid days left.');
    }

    let payload = {
        username: username,
        reason: data.reason,
        date: moment(data.date).toISOString(),
    };

    let paidTimeLog = new PaidTimeLog(payload);

    await PaidTime.useDay(username);

    return await paidTimeLog.save();
}

async function get(username) {
    return await PaidTimeLog.find({ username: username }).sort({ date: 1 });
}

async function getRange(username, data) {
    let payload = {
        username: username,
        date: { $gte: moment(data.start).toISOString(), $lte: moment(data.end).toISOString() }
    };

    return await PaidTimeLog.find(payload);
}

async function update(id, data) {
}

module.exports = {
    create,
    get,
    getRange,
    update,
};
