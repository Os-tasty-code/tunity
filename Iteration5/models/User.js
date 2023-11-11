const mongoose = require('../database');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // Login Information
    login: {
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      accountType: { type: String, enum: ['listener', 'dj', 'producer'], default: 'listener' }
    },
    // User Settings
    settings: {
      volume: { type: Number, default: 50 }
    },
    // User Profile
    profile: {
      bio: { type: String, default: '' },
      picture: { type: String, default: '' }
    },
    // Listener Data
    listenerData: {
        timeOnSite: { type: Number, default: 0 },
        songRecommendations: [{
            name: { type: String, required: true },
            status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
            message: String
        }]
    },
    // DJ Data
    djData: {
        temp: String
    },
    // Producer Data
    producerData: {
        temp: String
    }
    
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
