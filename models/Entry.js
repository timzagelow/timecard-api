const mongoose = require('mongoose');
const { Schema } = mongoose;

const entrySchema = new Schema({
    username: String,
    type: String,
    date: { type: Date, default: Date.now },
});

entrySchema.statics.isPunchedIn = async (username) => {
    let entry = await Entry.findOne({ username: username }).sort({ date: -1 });

    return entry && entry.type === 'in';
};

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;