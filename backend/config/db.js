const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};
// this is named export so we need to use {} to import
module.exports = {connectToMongoDB};
