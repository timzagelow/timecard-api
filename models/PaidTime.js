const mongoose = require('mongoose');
const { Schema } = mongoose;

const paidTimeLogSchema = new Schema({
    username: String,
    date: { type: Date, default: Date.now },
    reason: String,
});

const paidTimeSchema = new Schema({
    username: { type: String, unique: true },
    used: Number,
    available: Number,
});

paidTimeSchema.statics.useDay = async (username) => {
    return await PaidTime.findOneAndUpdate({ username: username }, { $inc: { used: 1, available: -1 }});
};

const PaidTimeLog = mongoose.model('PaidTimeLog', paidTimeLogSchema);
const PaidTime = mongoose.model('PaidTime', paidTimeSchema);

module.exports = { PaidTime, PaidTimeLog };