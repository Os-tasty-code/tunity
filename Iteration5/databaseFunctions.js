const UserModel = require('./models/User');
const SongModel = require('./models/Song');
const CurrentStateModel = require('./models/CurrentState');
const mongoose = require('mongoose');
//Images stored in separate file because they are huge. (Alternatively, make a base64 converter script later to dynamically convert images to strings for the db)
const {imageString_user, imageString_MarvinGaye, imageString_DJElla} = require('./public/scripts/imageStrings');

const { isContext } = require('vm');


//Load test data if db is empty.
async function loadTestData() {
    let testSong, testDj;
    try {
        const userCount = await UserModel.countDocuments();
        if (userCount === 0) {
            // Create and save test listener user
            const testUser = new UserModel({
                login: {
                    username: 'user',
                    password: 'user',
                    accountType: 'listener'
                },
                settings: {
                    volume: 70
                },
                profile: {
                    bio: 'Hi this is philip',
                    picture: imageString_user
                },
                listenerData: {
                    timeOnSite: 120,
                    songRecommendations: [
                        { name: 'Accepted Song', status: 'ACCEPTED', dj: 'DJ Ella'},
                        { name: 'Rejected Song', status: 'REJECTED', dj: 'DJ Ella'}, 
                        { name: 'Pending Song 1', status: 'PENDING', dj: 'DJ Ella'}, 
                        { name: 'Pending Song 2', status: 'PENDING', dj: 'DJ Ella'}
                    ]
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
                    bio: 'Motown with a double shot of depresso',
                    picture: imageString_DJElla
                },
                djData: {
                    temp: 'some_temp_data'
                }
            });
            await testDj.save();
            console.log('Test DJ inserted into the database.');
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

    if(exists == 0) {
        const testSong = new SongModel({
            title: "Oreburgh City (Day)",
            artist: "Nintendo feat. Game Freak",
            album: "Pokemon Diamond/Pearl/Platinum",
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

async function getPlaylist() {
    let playlist = SongModel.find().exec();
    return playlist;
}

module.exports = { loadTestData, clearDatabase, getCurrentSong, getCurrentDJ, loadSong, getPlaylist};