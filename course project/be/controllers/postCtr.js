const Post = require("../model/Post");
const User = require("../model/User");
const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");
const PostService = require("../service/PostService");
const UserService = require("../service/UserService");
const NotificationService = require("../service/NotificationService");

// @desc Create Post
exports.createPost = asyncHandler(async (req, res) => {
  // Create The Post
  req.body.author = req.user._id;

  const post = await PostService.createPost(req.body);

  // Associate user to post
  await UserService.addUserPost(req.user._id, post._id);

  NotificationService.createNotification(
    "CREATE NEW POST",
    post.title,
    "info",
    req.user.followers
  )

  res.status(201).send({ data: post });
});

// @desc Update Post
exports.updatePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  if (!post) {
    return next(new apiError(`No Post for this id ${id}`));
  }

  // Check if The Post Belong To User
  if (post.author.toString() !== req.user._id.toString()) {
    return next(new apiError(`You are not allowed to update this post`, 403));
  }

  const doc = await Post.findOneAndUpdate(post._id, req.body, { new: true });

  res.status(200).json({ data: doc });
});

// @desc Get List of Posts
// exports.allPosts = asyncHandler(async (req, res) => {
//   const post = await Post.find().populate("author");

//   const posts = post.filter((item) => {
//     return !item.author.blocked.includes(req.user._id);
//   });

//   res.status(200).json({ size: posts.length, data: posts });
// });

exports.allPosts = asyncHandler(async (req, res) => {
  const post = await Post.find().populate("author").populate("comments");

  const posts = post.filter((item) => {
    return !item.author.blocked.includes(req.user._id);
  });

  res.status(200).json({ size: posts.length, data: posts });
});

// @desc Get a single post
exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate("author").populate("comments");

  if (!post) {
    return next(new apiError(`No post for this id ${req.params.id}`, 404));
  }

  if (post.author.blocked.includes(req.user._id)) {
    return next(
      new apiError(`Sorry, You Are Not Allowed to Access This Post`, 403)
    );
  }

  res.send(post);
});

// @desc Delete Post
exports.deletePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findById(id);
  if (!post) {
    return next(new apiError(`No Post for this id ${id}`));
  }

  // Check if The Post Belong To User
  if (post.author.toString() !== req.user._id.toString()) {
    return next(new apiError(`You are not allowed to delete this post`, 403));
  }

  await Post.findByIdAndDelete(id);

  //
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { posts: post._id },
    },
    { new: true }
  );

  res.status(204).send();
});

exports.likePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const userId = req.user._id

  const post = await Post.findById(id);

  if (!post) {
    return next(new apiError(`No Post for this id ${id}`));
  }

  const isPostLike = post.likes.includes(userId);

  if (isPostLike) {
    return next(new apiError(`User name: ${req.user.fullname} is already like this post with name: ${post.title}`, 422));
  }

  const updatedPost = await Post.findOneAndUpdate(
    { _id: id },
    { $addToSet: { likes: userId } },
    { new: true }
  )

  // AOP -> SOLID 
  // CRON JOB SCAN DATABASE CHECK NEW RECORD
  // MONGODB EVENT TRIGGER INSERT HOẶC UPDATE ĐỂ TẠO NOTIFICATION
  // MONGODB WEBHOOK 

  NotificationService
    .createNotification(
      "LIKE POST",
      `User name: ${req.user.fullname} is like your post!!`,
      "info",
      [updatedPost.author]
    )
    .catch((error) => {
      // retry create notify set gioi 2 - 3 lan 
      console.log(error)
    })

  res.status(200).json({ data: updatedPost });
});

exports.unLikePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const userId = req.user._id

  const post = await Post.findById(id);

  if (!post) {
    return next(new apiError(`No Post for this id ${id}`));
  }

  const isPostLike = post.likes.includes(userId);

  if (!isPostLike) {
    return next(new apiError(`User name: ${req.user.fullname} is not like this post with name: ${post.title}`, 422));
  }

  const updatedPost = await Post.findOneAndUpdate(
    { _id: id },
    { $pull: { likes: userId } },
    { new: true }
  )

  NotificationService
    .createNotification(
      "UNLIKE POST",
      `User name: ${req.user.fullname} is unlike your post!!`,
      "info",
      [updatedPost.author]
    )
    .catch((error) => {
      // retry create notify set gioi 2 - 3 lan 
      console.log(error)
    })

  res.status(200).json({ data: updatedPost });
});