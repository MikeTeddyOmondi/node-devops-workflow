const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        require: [true, "A user must have a username!"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "A user must have a password!"]
    },
});

const User = mongoose.model("User", userSchema)

module.exports = User;