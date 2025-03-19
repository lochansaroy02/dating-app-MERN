const mongoose = require('mongoose');

const schema = mongoose.Schema;
const userSchema = new schema({
    name: { type: String, required: true },
    age: { type: Number, required: false },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    relationship: { type: String, required: true },
    religion: { type: String, required: true },
    likedBy: { type: Array, default: [Object], required: false },
    likes: { type: Array, default: [Object], required: false },
    images: { type: Array, default: [] },
})

module.exports = mongoose.model('User', userSchema); // this is default export so we don't need to use {} to import