const { PaidTime } = require('../models/PaidTime');

async function create(username, data) {
    if (!data.used) {
        data.used = 0;
    }

    if (!data.available) {
        data.available = 0;
    }

    let paidTime = new PaidTime({
        username: username,
        used: data.used,
        available: data.available,
    });

    return await paidTime.save();
}

async function get(username) {
    return await PaidTime.findOne({ username: username });
}

async function getAll() {
    return await PaidTime.find();
}

async function update(username, data) {
    const paidTime = await PaidTime.findOne({ username: username });

    // for (let key in data) {
    //     if (data.hasOwnProperty(key)) {
    //         paidTime[key] = data[key];
    //     }
    // }

    if (data.used) {
        paidTime.used = data.used;
    }

    if (data.available) {
        paidTime.available = data.available;
    }

    return await paidTime.save();
}

module.exports = {
    create,
    get,
    getAll,
    update,
};
