const UserModel = require('./models/User');
const SongModel = require('./models/Song');
const CurrentStateModel = require('./models/CurrentState');
const PlaylistSongModel = require('./models/Playlist');

const mongoose = require('mongoose');
//Images stored in separate file because they are huge. (Alternatively, make a base64 converter script later to dynamically convert images to strings for the db)
const {imageString_user, imageString_MarvinGaye, imageString_DJElla} = require('./public/scripts/imageStrings');

const { isContext } = require('vm');
const djScheduleModel = require('./models/DJSchedule');



async function loadTestData() {
    try {
        // Check counts for each type of data
        const userCount = await UserModel.countDocuments();
        const songCount = await SongModel.countDocuments();
        const currentStateCount = await CurrentStateModel.countDocuments();
        const playlistSongCount = await PlaylistSongModel.countDocuments();
        const djCount = await djScheduleModel.countDocuments();
        let testSong = null;
        let testDj = null; 

        // Load test users if needed
        if (userCount === 0) {
            const testUser = new UserModel({
                login: {
                    username: 'user',
                    password: 'user',
                    accountType: 'listener'
                },
                settings: { volume: 70 },
                profile: {
                    bio: 'Hi this is Philip',
                    picture: imageString_user
                },
                listenerData: {
                    timeOnSite: 120,
                    songRecommendations: [
                        { name: 'Accepted Song', status: 'ACCEPTED', dj: 'djella'},
                        { name: 'Rejected Song', status: 'REJECTED', dj: 'djella'}, 
                        { name: 'Pending Song 1', status: 'PENDING', dj: 'djella'}, 
                        { name: 'Pending Song 2', status: 'PENDING', dj: 'djella'}
                    ]
                },
            });
            await testUser.save();

            testDj = new UserModel({
                login: {
                    username: 'djella',
                    password: 'sickbeats',
                    accountType: 'dj'
                },
                settings: { volume: 70 },
                profile: {
                    bio: 'Motown with a double shot of depresso',
                    picture: imageString_DJElla
                },
                djData: {
                    temp: 'some_temp_data'
                }
            });
            await testDj.save();

            const testProducer = new UserModel({
                login: {
                    username: 'rvamaswamy',
                    password: 'Musk4Life',
                    accountType: 'producer'
                },
                settings: { volume: 50 },
                profile: {
                    bio: 'Need to cut costs as much as possible',
                    picture: imageString_DJElla
                },
                producerData: {
                    temp: 'some_temp_data'
                }
            });
            await testProducer.save();

            console.log('Test users inserted into the database.');
        }

        // Load test DJs for schedule if needed
        if(djCount === 0) {
            const testDJ1 = new djScheduleModel({
                djName: "DJ Ella",
                djCode: "a",
                day: "sun",
                timeSection: "Morning"
            });
            await testDJ1.save();
            console.log("TestDJ1 added to database");

            const testDJ2 = new djScheduleModel({
                djName: "DJ Blake",
                djCode: "b",
                day: "sun",
                timeSection: "Evening"
            });
            await testDJ2.save();
            console.log("TestDJ2 added to database");

            const testDJ3 = new djScheduleModel({
                djName: "DJ Ur Mom",
                djCode: "c",
                day: "mon",
                timeSection: "Morning"
            });
            await testDJ3.save();
            console.log("TestDJ3 added to database");

            const testDJ4 = new djScheduleModel({
                djName: "DJ Ur Mom",
                djCode: "c",
                day: "mon",
                timeSection: "Evening"
            });
            await testDJ4.save();
            console.log("TestDJ4 added to database");

            const testDJ5 = new djScheduleModel({
                djName: "DJ JD",
                djCode: "d",
                day: "tue",
                timeSection: "Morning"
            });
            await testDJ5.save();
            console.log("TestDJ5 added to database");

            const testDJ6 = new djScheduleModel({
                djName: "DJ JD",
                djCode: "d",
                day: "tue",
                timeSection: "Evening"
            });
            await testDJ6.save();
            console.log("TestDJ6 added to database");

            const testDJ7 = new djScheduleModel({
                djName: "DJ Blake",
                djCode: "b",
                day: "wed",
                timeSection: "Morning"
            });
            await testDJ7.save();
            console.log("TestDJ7 added to database");

            const testDJ8 = new djScheduleModel({
                djName: "DJ Blake",
                djCode: "b",
                day: "wed",
                timeSection: "Evening"
            });
            await testDJ8.save();
            console.log("TestDJ8 added to database");

            const testDJ9 = new djScheduleModel({
                djName: "DJ Ella",
                djCode: "a",
                day: "thu",
                timeSection: "Morning"
            });
            await testDJ9.save();
            console.log("TestDJ9 added to database");

            const testDJ10 = new djScheduleModel({
                djName: "DJ JD",
                djCode: "d",
                day: "thu",
                timeSection: "Evening"
            });
            await testDJ10.save();
            console.log("TestDJ10 added to database");

            const testDJ11 = new djScheduleModel({
                djName: "DJ JD",
                djCode: "d",
                day: "fri",
                timeSection: "Morning"
            });
            await testDJ11.save();
            console.log("TestDJ11 added to database");

            const testDJ12 = new djScheduleModel({
                djName: "DJ Ur Mom",
                djCode: "c",
                day: "fri",
                timeSection: "Evening"
            });
            await testDJ12.save();
            console.log("TestDJ12 added to database");

            const testDJ13 = new djScheduleModel({
                djName: "DJ Blake",
                djCode: "b",
                day: "sat",
                timeSection: "Morning"
            });
            await testDJ13.save();
            console.log("TestDJ13 added to database");

            const testDJ14 = new djScheduleModel({
                djName: "DJ JD",
                djCode: "d",
                day: "sat",
                timeSection: "Evening"
            });
            await testDJ14.save();
            console.log("TestDJ14 added to database");
        }

        // Load test songs if needed
        if (songCount === 0) {
            testSong = new SongModel({
                title: "Accumula Town",
                artist: "Nintendo feat. Game Freak",
                album: "Pokemon: Black & White",
                genre: ["Video Game"],
                audioUrl: "/songs/Song-1.mp3",
                albumArtUrl: "/images/album-art-accumula-town.jpg"
            });
            await testSong.save();
            await loadSong("Song-2.mp3", "Is this ashleys theme?", "Nintendo", "Wario ware", ["Video Game"], "/images/album-art-ashleys-theme.jpg");
            await loadSong("Song-3.mp3", "idk some harvest moon sounding jazz", "Nintendo", "harvest moon", ["Video Game"], "/images/album-art-harvest-moon.jpg");

        }

        // Load songs into playlist if needed
        if (playlistSongCount === 0) {
            await loadPlaylistSong("Accumula Town", 10);
            await loadPlaylistSong("Is this ashleys theme?", 10);
            await loadPlaylistSong("idk some harvest moon sounding jazz", 10);
        }

        // Update current state if needed
        if (currentStateCount === 0) {
            const currentState = new CurrentStateModel({
                currentSong: testSong ? testSong._id : null,
                currentDj: testDj ? testDj._id : null
            });
            await currentState.save();

            console.log('Current state updated with test song and DJ.');
        }
    } catch (err) {
        console.error('Error inserting test data:', err);
    }
}




//Delete all docs in the db for debugging
async function clearDatabase() {
    try {
        // Delete all users
        await UserModel.deleteMany({});
        console.log('All users deleted.');

        // Delete all songs
        await SongModel.deleteMany({});
        console.log('All songs deleted.');

        // Delete all DJs
        await djScheduleModel.deleteMany({});
        console.log("All DJs deleted.");

        // Delete all current state entries
        await CurrentStateModel.deleteMany({});
        console.log('Current state deleted.');

        // Add deletion for each of your other models
        // For example:
        await PlaylistSongModel.deleteMany({});
        console.log('Playlist songs deleted.');

        await djScheduleModel.deleteMany({});
        console.log('DJ schedules deleted.');

        // Include other models similarly

    } catch (err) {
        console.error('Error clearing the database:', err);
    }
}



//Return the current song document
async function getCurrentSong() {
    try {
        const currentState = await CurrentStateModel.findOne().populate('currentSong');
        return currentState ? currentState.currentSong : null;
    } catch (err) {
        console.error('Error fetching current song:', err);
        return null;
    }
}

//Jane Jacobs
//Return the current dj document
async function getCurrentDJ() {
    try {
        const currentState = await CurrentStateModel.findOne().populate('currentDj');
        return currentState ? currentState.currentDj : null;
    } catch (err) {
        console.error('Error fetching current DJ:', err);
        return null;
    }
}

// O Dodart
async function loadSong(filename, title, artist, album, genre, albumArtUrl) {
    const exists = await SongModel.countDocuments({ title: title });

    if (exists === 0) {
        const newSong = new SongModel({
            title: title,
            artist: artist,
            album: album,
            genre: genre,
            audioUrl: `/songs/${filename}`,
            albumArtUrl: albumArtUrl
        });

        await newSong.save();
        console.log("Song added: " + title);
    } else {
        console.log("Song already exists in the database: " + title);
    }
}


async function loadPlaylistSong(songTitle, priority) {
    try {
        // Find the song by title in the SongModel
        const song = await SongModel.findOne({ title: songTitle });

        // Check if the song exists
        if (!song) {
            console.log("Song not found in the database.");
            return;
        }

        // Create a new playlist song entry with the given song and priority
        const playlistSong = new PlaylistSongModel({
            song: song._id,
            priority: priority
        });

        // Save the new playlist song
        await playlistSong.save();
        console.log("Playlist Song added:", songTitle);
    } catch (err) {
        console.error("Error adding song to playlist:", err);
    }
}


async function getPlaylist() {
    let playlist = await PlaylistSongModel.find().exec();
    //sort based on priority
    let songs = [];
    for (i = 0; i < playlist.length; i++) {
        songs[i] = await SongModel.find({_id: playlist[i].song}).exec();
    }
    return songs;
}

//Author: Ramsha Kapadia
async function getDJSchedule() {
    let schedule = djScheduleModel.find().exec();
    return schedule;
}

module.exports = { loadTestData, clearDatabase, getCurrentSong, getCurrentDJ, loadSong, getPlaylist, getDJSchedule, loadPlaylistSong};