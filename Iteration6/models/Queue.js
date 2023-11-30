const mongoose = require('../database');
const Schema = mongoose.Schema;

const queueSchema = new Schema({
    song: { type: Schema.Types.ObjectId, ref: 'Song' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    priority: { type: Number, default: 0},
    timeAssigned: {type: Date, default: new Date()}
});

const QueueModel = mongoose.model('QueueModel', queueSchema);
module.exports = QueueModel;