const UserModel = require('./models/User');
const SongModel = require('./models/Song');
const { isContext } = require('vm');


//Load testing data into DB if its empty
async function loadTestData() {
    try {
        const userCount = await UserModel.countDocuments();
        if (userCount === 0) {

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
                    picture: './public/images/user-profile-pic.jpg'
                },
                listenerData: {
                    timeOnSite: 120,
                    songRecommendations: [
                        { name: 'Test Song 1', status: 'pending' },
                        { name: 'Test Song 2', status: 'pending' }
                    ]
                },
            });
            await testUser.save();
            console.log('Test user inserted into the database.');
        } else {
            console.log('Database already has users. No test data inserted.');
        }
    } catch (err) {
        console.error('Error inserting test data:', err);
    }
}

//Delete all docs in the db
async function clearDatabase() {
    try {
        // Delete all users
        await UserModel.deleteMany({});
        console.log('All users deleted.');

        // Delete all songs
        await SongModel.deleteMany({});
        console.log('All songs deleted.');

        // Add similar lines for other models/collections if you have any
    } catch (err) {
        console.error('Error clearing the database:', err);
    }
}

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

    // let bucket = new GridFSBucket(db, {
    //     bucketName: filepath
    // })

    // let uploadStream = bucket.openUploadStream(filepath);
    // let id = uploadStream.id;
    // readableTrackStream.pipe(uploadStream);

    // uploadStream.on('error', () => {
    //   return res.status(500).json({ message: "Error uploading file" });
    // });

    // uploadStream.on('finish', () => {
    //   return res.status(201).json({ message: "File uploaded successfully, stored under Mongo ObjectID: " + id });
    // });

module.exports = { loadTestData, clearDatabase, loadSong };