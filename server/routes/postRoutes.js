import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import {
  createPost,
  getPosts,
  getPost,
  getUserPost,
  getComments,
  likePost,
  commentPost,
  replyPostComment,
  deletePost,
  likePostComment,
} from "../controllers/postController.js";

const router = express.Router();

// create post
router.post("/create-post", userAuth, createPost);
// get posts with seach
router.post("/", userAuth, getPosts);
router.post("/:id", userAuth, getPost);
router.post("/get-user-post/:id", userAuth, getUserPost);

// get comments
router.post("/comments/:postId", getComments);
// likes
router.post("/like/:id", userAuth, likePost);
router.post("/like-comment/:id/:rid?", userAuth, likePostComment);
// post comments / reply
router.post("/comment/:id", userAuth, commentPost); // push comment
router.post("/reply-comment/:id", userAuth, replyPostComment); // push reply comment

// delete post
router.delete("/:id", userAuth, deletePost);
export default router;
