/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import TextInput from "./TextInput";
import NoProfile from '../assets/userprofile.png'
import { useState } from "react";
import Loading from "./Loading";

const CommentForm = ({ user, id, replyAt, getComments }) => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!comment) {
      setError("Write something");
    }
    setLoading(true)
    setTimeout(() => {
        setLoading(false)
      }, 2000)
  };

  const handleChange = (e) => {
    setComment(e.target.value);
    setError("");
    setLoading(false)
  };

  return (
    <form onSubmit={handleSubmit} className='w-full border-b border-[#66666645]'>
      <div className='w-full flex items-center gap-2 py-4'>
        <img
          src={user?.profileUrl ?? NoProfile}
          alt='User Image'
          className='w-10 h-10 rounded-full object-cover'
        />

        <TextInput
          name='comment'
          styles='w-full rounded-full py-3'
          placeholder={replyAt ? `Reply @${replyAt}` : "Comment this post"}
          value={comment}
          onChange={handleChange}
          error={error}
        />
      </div>
      {errMsg?.message && (
        <span
          role='alert'
          className={`text-sm ${
            errMsg?.status === "failed"
              ? "text-[#f64949fe]"
              : "text-[#2ba150fe]"
          } mt-0.5`}
        >
          {errMsg?.message}
        </span>
      )}

      <div className='flex items-end justify-end pb-2'>
        {loading ? (
          <Loading />
        ) : (
          <button
            type='submit'
            className='bg-[#0444a4] text-white py-1 px-3 rounded-full font-semibold text-sm'
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
};

export default CommentForm;
