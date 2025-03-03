const mongoose = require('mongoose');

const schema = mongoose.Schema;
const authSchema = new schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
})

module.exports = mongoose.model('Auth', authSchema); // this is default export so we don't need to use {} to import