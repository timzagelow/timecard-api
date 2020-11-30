const moment = require('moment');
const { PaidTime, PaidTimeLog } = require('../models/PaidTime');
const Entry = require('../models/Entry');

async function getTotals(data) {
    const entries = await Entry.find({ date: { $gte: moment(data.start + ' 00:00:00').utc(), $lte: moment(data.end + ' 23:59:59').utc()}});

    let indexed = {};

    entries.forEach(entry => {
        if (!indexed[entry.username]) {
            indexed[entry.username] = {};
            indexed[entry.username].entries = [];
        }

        indexed[entry.username].entries.push({type: entry.type, date: entry.date});
    });

    for (let user in indexed) {
        indexed[user].hours = calculateHours(indexed[user].entries);
    }

    return indexed;
}

function calculateHours(entries) {
    let numEntries = entries.length;
    let hours = 0;

    for (let i = 0; i < numEntries; i++) {
        let nextEntry = i+1;

        let current = entries[i];
        let next = entries[nextEntry];

        if (current.type === 'in' && next) {
            let inDate = moment(current.date);
            let outDate = moment(next.date);

            let duration = moment.duration(outDate.diff(inDate));
            hours += duration.asHours();
        }
    }

    return hours.toFixed(2);
}

module.exports = { getTotals };