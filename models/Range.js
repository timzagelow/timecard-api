const mongoose = require('mongoose');
const { Schema } = mongoose;
const DateOnly = require('mongoose-dateonly')(mongoose);

const rangeSchema = new Schema({
    start: DateOnly,
    end: DateOnly,
});

const Range = mongoose.model('Range', rangeSchema);

module.exports = Range;