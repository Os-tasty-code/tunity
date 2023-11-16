//Stores current dj and song being played. Maybe update to also include an 'up next' too
const mongoose = require('../database');
const Schema = mongoose.Schema;

const currentStateSchema = new Schema({
    currentSong: { type: Schema.Types.ObjectId, ref: 'Song' },
    currentDj: { type: Schema.Types.ObjectId, ref: 'User' }
});

const CurrentStateModel = mongoose.model('CurrentState', currentStateSchema);
module.exports = CurrentStateModel;
