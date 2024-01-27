import Comments from "../models/commentModel.js";
import Posts from "../models/postModel.js";
import Users from "../models/userModel.js";

export const createPost = async (req, res, next) => {
    try {
      const { userId } = req.body.user;
      const { description, image } = req.body;
  
      if (!description) {
        next("You must provide a description");
        return;
      }
  
      const post = await Posts.create({
        userId,
        description,
        image,
      });
  
      res.status(200).json({
        sucess: true,
        message: "Post created successfully",
        data: post,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error.message });
    }
  };
  

  export const getPosts = async (req, res, next) => {
    try {
      const { userId } = req.body.user;
      const { search } = req.body;
  
      const user = await Users.findById(userId);
      const friends = user?.friends?.toString().split(",") ?? [];   // covert friends array intp array of string
      friends.push(userId);

      // this search query get post of our friends and our post only
      const searchPostQuery = {
        $or: [
          {
            description: { $regex: search, $options: "i" }, // if search matches with description , search is case-insensative
          },
        ],
      };
  
      const posts = await Posts.find(search ? searchPostQuery : {})
        .populate({
          path: "userId", 
          select: "firstName lastName location profileUrl -password",  // populate the users excluding password
        })
        .sort({ _id: -1 }); // sort in order of newest first
  
      const friendsPosts = posts?.filter((post) => {
        return friends.includes(post?.userId?._id.toString());
      });
  
      const otherPosts = posts?.filter(
        (post) => !friends.includes(post?.userId?._id.toString())
      );
  
      let postsRes = null;
  
      if (friendsPosts?.length > 0) {
        postsRes = search ? friendsPosts : [...friendsPosts, ...otherPosts];
      } else {
        postsRes = posts;
      }
  
      res.status(200).json({
        sucess: true,
        message: "successfully",
        data: postsRes,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error.message });
    }
  };

  export const getPost = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const post = await Posts.findById(id).populate({
        path: "userId",
        select: "firstName lastName location profileUrl -password",
      });
      // .populate({
      //   path: "comments",
      //   populate: {
      //     path: "userId",
      //     select: "firstName lastName location profileUrl -password",
      //   },
      //   options: {
      //     sort: "-_id",
      //   },
      // })
      // .populate({
      //   path: "comments",
      //   populate: {
      //     path: "replies.userId",
      //     select: "firstName lastName location profileUrl -password",
      //   },
      // });
  
      res.status(200).json({
        sucess: true,
        message: "successfully",
        data: post,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error.message });
    }
  };

  export const getUserPost = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const post = await Posts.find({ userId: id })
        .populate({
          path: "userId",
          select: "firstName lastName location profileUrl -password",
        })
        .sort({ _id: -1 });
  
      res.status(200).json({
        sucess: true,
        message: "successfully",
        data: post,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error.message });
    }
  };


//   comments controller 
  export const getComments = async (req, res, next) => {
    try {
      const { postId } = req.params;
  
      const postComments = await Comments.find({ postId })
        .populate({
          path: "userId",
          select: "firstName lastName location profileUrl -password",
        })
        .populate({
          path: "replies.userId",
          select: "firstName lastName location profileUrl -password",
        })
        .sort({ _id: -1 });
  
      res.status(200).json({
        sucess: true,
        message: "successfully",
        data: postComments,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error.message });
    }
  };






// likes
export const likePost = async (req, res, next) => {
    try {
      const { userId } = req.body.user;
      const { id } = req.params;
  
      const post = await Posts.findById(id);
  
      const index = post.likes.findIndex((pid) => pid === String(userId));
  // toggling the likes
      if (index === -1) {
        post.likes.push(userId);
      } else {
        post.likes = post.likes.filter((pid) => pid !== String(userId));
      }
  // performing like update
      const newPost = await Posts.findByIdAndUpdate(id, post, {
        new: true,
      });
  
      res.status(200).json({
        sucess: true,
        message: "successfully",
        data: newPost,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error.message });
    }
  };