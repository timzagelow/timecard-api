const Calendar = require('../models/Calendar');
const moment = require('moment');

async function get(from, to) {
    if (!from) {
        from = moment();
    }

    if (!to || to.length === 0) {
        to = from;
    }

    let start = moment(from).startOf('day');
    let end = moment(to).endOf('day');

    const entries = await Calendar.find();
    
    return entries.map(entry => {
        let date = moment(entry.start);
        console.log(date);
        if (date.isBetween(start, end)) {
            return entry;
        }
    }).filter(Boolean);
}

async function create(username, title, startDate, endDate) {
    let start, end;

    if (startDate.length === 10) {
        start = moment(startDate).format('YYYY-MM-DD');
    } else {
        start = moment(startDate).format('YYYY-MM-DD HH:mm')
    }

    if (endDate.length === 10) {
        end = moment(endDate).format('YYYY-MM-DD');
    } else {
        end = moment(endDate).format('YYYY-MM-DD HH:mm');
    }

    let entry = new Calendar({ username: username, title: title, start: start, end: end });

    return await entry.save();
}

async function remove(id) {
    return await Calendar.remove({ _id: id });
}

async function update(id, data) {
    const entry = await Calendar.findOne({ _id: id });

    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            entry[key] = data[key];
        }
    }

    return await entry.save();
}

module.exports = {
    create,
    get,
    remove,
};