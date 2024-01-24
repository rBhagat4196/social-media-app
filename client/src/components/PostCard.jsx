/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import NoProfile from '../assets/userprofile.png'
import { Link } from "react-router-dom";
const PostCard = ({post , user , deletePost , likePost}) => {
    const [showAll , setShowAll] = useState(0);
    const [showReply , setShowReply] = useState(0);
    const [comments , setComments] = useState([]);
    const [loading , setLoading] = useState(false);
    const [replyComments ,setReplyComments] = useState(0);
    const [showsComment , setShowComments] = useState(0);

  return (
    <div className="mb-2 bg-primary p-4 rounded-xl">
        <Link to={"/profile/"+post?.userId?._id}>
      <div className="flex gap-3 items-center mb-2">
        <img
              src={post?.userId?.profileUrl ?? NoProfile}
              alt={post?.userId?.firstName}
              className='w-14 h-14 object-cover rounded-full'
            />
        <div className='flex flex-col justify-center'>
              <p className='text-lg font-medium text-ascent-1'>
                {post?.userId?.firstName} {post?.userId?.lastName}
              </p>
              <span className='text-ascent-2'>
                {post?.userId?.location}
              </span>
            </div>
      </div>
        </Link>
    </div>
  )
}
export default PostCard
