const mongoose = require('mongoose');
const { Schema } = mongoose;

const rangeSchema = new Schema({
    start: Date,
    end: Date
});

const Range = mongoose.model('Range', rangeSchema);

module.exports = Range;