const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/Tunity';
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(mongoURI, mongoOptions)
    .then(() => {
        console.log('MongoDB connected');
     })
  .catch(err => console.error('MongoDB connection error:', err));
module.exports = mongoose;

