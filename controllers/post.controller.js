const Post = require("../models/Post.model")

exports.getAllPosts = async(req, res, next) => {
    try {
        const posts = await Post.find({});

        res.status(200).json({
            status: 'success',
            results: posts.length,
            data: {
                posts,
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'Error occurred while retrieving posts!'
        })
    }
}

exports.getOnePost = async(req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                post,
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'Error occurred while retrieving the post!'
        })
    }
}

exports.createPost = async(req, res, next) => {
    try {
        const post = await Post.create(req.body);

        res.status(200).json({
            status: 'success',
            data: {
                post,
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'Error occurred while creating the post!'
        })
    }
}

exports.updatePost = async(req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                post,
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'Error occurred while updating the post!'
        })
    }
}

exports.deleteOnePost = async(req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'success',
            message: 'Deleted the post successfully...'
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'Error occurred while deleting the post!'
        })
    }
}