const { PaidTime } = require('../models/PaidTime');

async function create(username, data) {
    let paidTime = new PaidTime({
        username: username,
        used: data.used,
        available: data.available,
    });

    return await paidTime.save();
}

async function get(username) {
    return await PaidTime.find({ username: username });
}

async function update(username, data) {
    let payload = { username: username };

    if (data.used) {
        payload.used = data.used;
    }

    if (data.available) {
        payload.available = data.available;
    }

    const paidTime = PaidTime.findOne({ username: username });

    return await paidTime.save();
}

module.exports = {
    create,
    get,
    update,
};
