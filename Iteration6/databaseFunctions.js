const UserModel = require('./models/User');
const SongModel = require('./models/Song');
const CurrentStateModel = require('./models/CurrentState');
const PlaylistSongModel = require('./models/Playlist');

const mongoose = require('mongoose');
//Images stored in separate file because they are huge. (Alternatively, make a base64 converter script later to dynamically convert images to strings for the db)
const {imageString_user, imageString_MarvinGaye, imageString_DJElla} = require('./public/scripts/imageStrings');

const { isContext } = require('vm');
const djScheduleModel = require('./models/DJSchedule');


//Load test data if db is empty.
async function loadTestData() {
    let testSong, testDj;
    try {
        const userCount = await UserModel.countDocuments();
        if (userCount === 1) {
            // Create and save test listener user
            const testUser = new UserModel({
                login: {
                    username: 'djella',
                    password: 'sickbeats',
                    accountType: 'dj'
                },
                settings: {
                    volume: 70
                },
                profile: {
                    bio: 'Motown with a double shot of depresso'
                },
                djData: {
                    temp: 'some_temp_data'
                },
            });
            await testUser.save();
            console.log('Test user inserted into the database.');

            // Create and save test DJ
            testDj = new UserModel({
                login: {
                    username: 'DJ Ella',
                    password: 'dj',
                    accountType: 'dj'
                },
                settings: {
                    volume: 50
                },
                profile: {
                    bio: 'Motown with a double shot of depresso'
                },
                djData: {
                    temp: 'some_temp_data'
                }
            });
            await testDj.save();
            console.log('Test DJ inserted into the database.');

            // author of testProducer: Ramsha Kapadia
            // create a save test Producer
            const testProducer = new UserModel({
                login: {
                    username: 'rvamaswamy',
                    password: 'Musk4Life',
                    accountType: 'producer'
                },
                settings: {
                    volume: 50
                },
                profile: {
                    bio: 'Need to cut costs as much as possible',
                    picture: imageString_DJElla
                },
                producerData: {
                    temp: 'some_temp_data'
                }
            });
            await testProducer.save();
            console.log('Test Producer inserted into the database.');
        }

        // author: Ramsha Kapadia
        // check and insert test DJs for schedule
        const djCount = await djScheduleModel.countDocuments();
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
                djName: "DJ Ella",
                djCode: "a",
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

        // Check and insert test song
        const songCount = await SongModel.countDocuments();
        if (songCount === 0) {
            testSong = new SongModel({
                title: "What's Going On",
                artist: "Marvin Gaye",
                album: "What's Going On",
                genre: ["Motown"],
                audioUrl: 'temp',
                albumArt: imageString_MarvinGaye,
                length: 73
            });
            await testSong.save();
            console.log('Test song inserted into the database.');
        }

        // Update current state with these values
        const currentStateCount = await CurrentStateModel.countDocuments();
        if (currentStateCount === 0) {
            const currentState = new CurrentStateModel({
                currentSong: testSong ? testSong._id : null,  // Check if testSong exists
                currentDj: testDj ? testDj._id : null       // Check if testDj exists
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

        // Delete all current state entries
        await CurrentStateModel.deleteMany({});
        console.log('Current state deleted.');

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
async function loadSong(filepath) {
    const exists = await SongModel.countDocuments()

    if(exists == 2) {
        const testSong = new SongModel({
            title: "Accumula Town",
            artist: "Nintendo feat. Game Freak",
            album: "Pokemon: Black & White",
            genre: "Video Game",
            audioUrl: filepath,
            albumArtUrl: "/"
        });

        await testSong.save();
        console.log("Song added")
    } else {
        console.log("Song has already been added")
    }
}

async function loadPlaylistSong() {
    const exists = await PlaylistSongModel.countDocuments()
    if(exists == 2) {
        let songs = await SongModel.find().exec();
        // priority: 0-150 = DJ added, 151-infinite = user added
        const playlistSong = new PlaylistSongModel({
            song: songs[2],
            priority: 60
        })
        await playlistSong.save();
        console.log("Playlist Song added")
    } else {
        console.log("Song has already been added")
    }
}

async function getPlaylist() {
    let playlist = PlaylistSongModel.find().exec();
    return playlist;
}

//Author: Ramsha Kapadia
async function getDJSchedule() {
    let schedule = djScheduleModel.find().exec();
    return schedule;
}

module.exports = { loadTestData, clearDatabase, getCurrentSong, getCurrentDJ, loadSong, getPlaylist, getDJSchedule, loadPlaylistSong};