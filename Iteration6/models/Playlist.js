const mongoose = require('../database');
const Schema = mongoose.Schema;

const playlistSongSchema = new Schema({
    song: { type: Schema.Types.ObjectId, ref: 'Song' },
    priority: { type: Number, default: 0},
    timeAssigned: {type: Date, default: new Date()}
});

const PlaylistModel = mongoose.model('playlistSong', playlistSongSchema);
module.exports = PlaylistModel;