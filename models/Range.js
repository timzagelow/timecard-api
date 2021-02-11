const mongoose = require('mongoose');
const { Schema } = mongoose;
const DateOnly = require('mongoose-dateonly')(mongoose);

// const timeZone = require('mongoose-timezone');

const rangeSchema = new Schema({
    start: DateOnly,
    end: DateOnly,
});

// rangeSchema.plugin(timeZone);
const Range = mongoose.model('Range', rangeSchema);

module.exports = Range;