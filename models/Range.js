const mongoose = require('mongoose');
const { Schema } = mongoose;
// const timeZone = require('mongoose-timezone');

const rangeSchema = new Schema({
    start: Date,
    end: Date
});

// rangeSchema.plugin(timeZone);
const Range = mongoose.model('Range', rangeSchema);

module.exports = Range;