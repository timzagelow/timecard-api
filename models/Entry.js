const mongoose = require('mongoose');
const { Schema } = mongoose;
// const timeZone = require('mongoose-timezone');

const entrySchema = new Schema({
    username: String,
    type: String,
    date: { type: Date, default: Date.now },
});

entrySchema.statics.isPunchedIn = async (username) => {
    let entry = await Entry.findOne({ username: username }).sort({ date: -1 });

    return entry.type === 'in';
};

// entrySchema.plugin(timeZone);

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;