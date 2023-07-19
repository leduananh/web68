const User = require("../model/User")

const UserService = {}

UserService.addUserPost = async (userId, postId) => {
    return await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: { posts: postId },
        },
        { new: true }
      );
}

module.exports = UserService