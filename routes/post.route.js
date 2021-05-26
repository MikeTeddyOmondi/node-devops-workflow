const express = require("express")

const postController = require("../controllers/post.controller")
const protect = require("../middlewares/auth.middleware")

const router = express.Router()

// URL: http://localhost:3000/api/v1/posts/ 
router
    .route("/")
    .get(protect, postController.getAllPosts)
    .post(protect, postController.createPost);

router
    .route("/:id")
    .get(protect, postController.getOnePost)
    .patch(protect, postController.updatePost)
    .delete(protect, postController.deleteOnePost);

module.exports = router