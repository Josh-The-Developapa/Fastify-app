const mongoose = require('mongoose');
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: [isEmail, "Please enter a valid email"]
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User