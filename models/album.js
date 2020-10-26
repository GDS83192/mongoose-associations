const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    songName: String,
});

const albumSchema = new mongoose.Schema({
    name: String,
    // embed songs in album
    songs: [songSchema],
});

const Album = mongoose.model('Album', albumSchema);
const Song = mongoose.model('Song', songSchema);

module.exports = { Album, Song };