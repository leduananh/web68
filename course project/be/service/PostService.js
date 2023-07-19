const Post = require("../model/Post")

const PostService = {}

PostService.createPost = async (post) => {
    return await Post.create(post) 
}

module.exports = PostService