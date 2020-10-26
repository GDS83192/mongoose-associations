const router = require('express').Router();
const Album = require('../models/album').Album;
const Song = require('../models/album').Song;

// INDEX
router.get('/', (req, res) => {
    Album.find({}, (error, allAlbums) => {
        res.render('./albums/index.ejs', {
            album: allAlbums,

        });
    });
});

// NEW Album FORM
router.get('/new', (req, res) => {
    res.render('albums/new.ejs');
});

// ADD EMPTY FORM TO ALBUM SHOW PAGE TO ADD SONG TO A ALBUM
router.get('/:albumId', (req, res) => {
    // find album in db by id and add new song
    Album.findById(req.params.albumId, (error, album) => {
        res.render('albums/show.ejs', { album });
    });
});

// CREATE A NEW Album
router.post('/', (req, res) => {
    Album.create(req.body, (error, newAlbum) => {
        res.send(newAlbum);
    });
});

router.post('/', (req, res) => {
    Album.create(req.body, (error, album) => {
        res.redirect(`/albums/${album.id}`);
    });
});

//DELETE Album

// DELETE
router.delete('/:id', (req, res) => {
    Album.findByIdAndRemove(req.params.id, (error) => {
        res.redirect('/albums');
    });
});


// UPDATE
router.put('/:id', (req, res) => {

    Album.findByIdAndUpdate(req.params.id, req.body, (error) => {
        res.redirect('/albums');
    });
});

// EDIT
router.get('/:id/editalbum', (req, res) => {
    Album.findById(req.params.id, (error, album) => {
        res.render('./albums/edit.ejs', { album });
    });
});



// CREATE SONG EMBEDDED IN ALBUM
router.post('/:albumId/songs', (req, res) => {
    console.log(req.body);
    // store new song in memory with data from request body
    const newSong = new Song({ songName: req.body.songName });
    // find album in db by id and add new song
    Album.findById(req.params.albumId, (error, album) => {
        album.songs.push(newSong);
        album.save((err, album) => {
            res.redirect(`/albums/${album.id}`);
        });
    });
});


router.get('/:albumId/songs/:songId/edit', (req, res) => {
    // set the value of the album and song ids
    const albumId = req.params.albumId;
    const songId = req.params.songId;
    // find album in db by id
    Album.findById(albumId, (err, foundAlbum) => {
        // find song embedded in album
        const foundSong = foundAlbum.songs.id(songId);
        // update song text and completed with data from request body
        res.render('songs/edit.ejs', { foundAlbum, foundSong });
    });
});
// UPDATE SONG EMBEDDED IN A ALBUM DOCUMENT
router.put('/:albumId/songs/:songId', (req, res) => {
    console.log('PUT ROUTE');
    // set the value of the album and song ids
    const albumId = req.params.albumId;
    const songId = req.params.songId;
    // find album in db by id
    Album.findById(albumId, (err, foundAlbum) => {
        // find song embedded in album
        const foundSong = foundAlbum.songs.id(songId);
        // update song text and completed with data from request body
        foundSong.songName = req.body.songName;
        foundAlbum.save((err, savedAlbum) => {
            res.redirect(`/albums/${foundAlbum.id}`);
        });
    });
});

router.delete('/:albumId/songs/:songId', (req, res) => {
    console.log('DELETE SONG');
    // set the value of the album and song ids
    const albumId = req.params.albumId;
    const songId = req.params.songId;
    // find album in db by id
    Album.findById(albumId, (err, foundAlbum) => {
        // find song embedded in album
        foundAlbum.songs.id(songId).remove();
        // update song text and completed with data from request body
        foundAlbum.save((err, savedAlbum) => {
            res.redirect(`/albums/${foundAlbum.id}`);
        });
    });
});

module.exports = router;