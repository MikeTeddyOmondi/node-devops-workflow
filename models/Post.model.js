const mongoose = require("mongoose")
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        require: [true, "A post must have a title!"],
    },
    body: {
        type: String,
        required: [true, "A post must have a body!"]
    },
});

const Post = mongoose.model("Post", postSchema)

module.exports = Post;