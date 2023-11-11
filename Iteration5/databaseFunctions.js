const UserModel = require('./models/User');
const SongModel = require('./models/Song');

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

module.exports = { loadTestData, clearDatabase };