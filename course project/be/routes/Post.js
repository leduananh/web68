const express = require("express");
const router = express.Router();

const {
  createPost,
  updatePost,
  allPosts,
  getPost,
  deletePost,
  likePost,
  unLikePost,
} = require("../controllers/postCtr");

const {
  requireSignIn,
  alowedTo,
  isBlocked,
} = require("../middlwares/authMiddlwares");

const {
  createPostValidator,
  removePostValidator,
  updatePostValidator,
  getPostValidator,
  likeAndUnLikePostValidator,
} = require("../utils/validators/postValidator");

// @desc Create Post
// @access Protect
router.post(
  "/",
  requireSignIn,
  alowedTo("admin", "user"),
  isBlocked,
  createPostValidator,
  createPost
);

// @desc Update Post
// @access Protect
router.put(
  "/:id",
  requireSignIn,
  alowedTo("admin", "user"),
  updatePostValidator,
  updatePost
);

// @desc get all Post
// @access Protect
router.get("/", requireSignIn, alowedTo("admin", "user"), allPosts);

// @desc get a single Post
// @access Protect
router.get(
  "/:id",
  requireSignIn,
  alowedTo("admin", "user"),
  getPostValidator,
  getPost
);

// @desc Delete a Post
// @access Protect
router.delete(
  "/:id",
  requireSignIn,
  alowedTo("admin", "user"),
  removePostValidator,
  deletePost
);

router.patch(
  "/like/:id",
  requireSignIn,
  alowedTo("admin", "user"),
  likeAndUnLikePostValidator,
  likePost
);

router.patch(
  "/unLike/:id",
  requireSignIn,
  alowedTo("admin", "user"),
  likeAndUnLikePostValidator,
  unLikePost
);

module.exports = router;
