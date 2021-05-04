const mongoose = require('mongoose');
const { Schema } = mongoose;
// const timeZone = require('mongoose-timezone');

const calendarSchema = new Schema({
    username: String,
    title: String,
    start: String,
    end: String,
    date: { type: Date, default: Date.now },
});

const Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = Calendar;