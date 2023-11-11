// Song.js
const mongoose = require('../database');
const Schema = mongoose.Schema;

const songSchema = new Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: String,
    genre: [String],
    audioUrl: { type: String, required: true },
    albumArtUrl: String,
    length: Number,
}, { timestamps: true });

const SongModel = mongoose.model('Song', songSchema);
module.exports = SongModel;
