/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux'
import TopBar from '../components/TopBar'
import ProfileCard from '../components/ProfileCard'
import FriendCard from '../components/FriendCard'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NoProfile from '../assets/userprofile.png'
import { BsPersonFillAdd } from 'react-icons/bs'
import TextInput from '../components/TextInput'
import Loading from '../components/Loading'
import { BiImages, BiSolidVideo } from 'react-icons/bi'
import { BsFiletypeGif } from 'react-icons/bs'
import PostCard from '../components/PostCard'
import EditProfile from '../components/EditProfile'
import {
  apiRequest,
  handleFileUpload,
  fetchPosts,
  likePost,
  deletePost,
  sendFriendRequest,
  getUserInfo,
} from '../../utils/index'
import { login } from '../redux/userSlice'
const HomePage = () => {
  const { user, edit } = useSelector((state) => state.user)
  const [friendRequest, setFriendRequest] = useState([])
  const [suggestedFriends, setSuggestedFriends] = useState([])
  const [post, setPost] = useState('')
  const [error, setError] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [posting, setPosting] = useState(false)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const { posts } = useSelector((state) => state.posts)
  const dispatch = useDispatch()
  const handleInputChange = (e) => {
    setPost(e.target.value)
    setError('')
  }
  const createPost = async (e) => {
    e.preventDefault()
    if (!post) {
      setError('Description is needed !')
      return
    }
    setPosting(true)
    setErrMsg('')
    try {
      const uri = file && (await handleFileUpload(file))
      console.log(uri)
      const newData = uri
        ? { description: post, image: uri }
        : { description: post }
      const res = await apiRequest({
        url: '/posts/create-post',
        data: newData,
        token: user?.token,
        method: 'POST',
      })
      if (res?.status === 'failed') {
        setErrMsg(res)
      } else {
        setPost('')
        setFile(null)
        setLoading(true)
        await fetchPost()
      }
      setPosting(false)
    } catch (e) {
      console.log(e)
    }
  }

  const fetchPost = async () => {
    await fetchPosts(user?.token, dispatch)
    setLoading(false)
  }
  const handleLikePost = async (uri) => {
    await likePost({ uri: uri, token: user?.token })
    await fetchPost()
  }
  const handleDelete = async (id) => {
    await deletePost(id, user?.token)
    await fetchPost()
    // console.log("deleted")
  }
  const fetchFriendRequest = async () => {
    try {
      const res = await apiRequest({
        url: '/users/get-friend-request',
        token: user?.token,
        method: 'POST',
      })
      setFriendRequest(res?.data)
    } catch (e) {
      console.log(e)
    }
  }
  const fetchSuggestedFriends = async () => {
    try {
      const res = await apiRequest({
        url: '/users/suggested-friends',
        token: user?.token,
        method: 'POST',
      })
      setSuggestedFriends(res?.data)
    } catch (error) {
      console.log(error)
    }
  }
  const handleFriendRequest = async (id) => {
    try {
      const res = await sendFriendRequest(user?.token, id)
      await fetchSuggestedFriends()
    } catch (error) {
      console.log(error)
    }
  }
  const acceptFriendRequest = async (id, status) => {
    try {
      const res = apiRequest({
        url: '/users/accept-request',
        token: user?.token,
        method: 'POST',
        data: { rid: id, status },
      })
      setFriendRequest(res?.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getUser = async () => {
    const res = await getUserInfo(user?.token);
    const newData = {token : user?.token , ...res};
    dispatch(login(newData))
  }
  useEffect(() => {
    setLoading(true)
    getUser()
    fetchPost()
    fetchFriendRequest()
    fetchSuggestedFriends()
  }, [])
  return (
    <>
      <div className='w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden'>
        {/* tobbar */}
        <TopBar />
        <div className='w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full'>
          {/* left side */}
          <div className='hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto'>
            <ProfileCard user={user} />
            <FriendCard friends={user?.friends} />
          </div>
          {/* center  */}
          <div className='flex flex-1 h-full px-4 flex-col gap-6 overflow-y-auto'>
            <form
              className='bg-primary px-4 rounded-lg'
              onSubmit={(e) => createPost(e)}
            >
              <div className='w-full flex items-center gap-2 py-4 border-b border-[#666666]'>
                <img
                  src={user?.profileUrl ?? NoProfile}
                  alt={user?.email}
                  className='w-14 h-14 object-cover rounded-full'
                />
                <TextInput
                  styles='w-full rounded-full py-5'
                  placeholder='Unleash your creativity, share your insights !'
                  name='description'
                  value={post}
                  onChange={handleInputChange}
                  onKeyDown={createPost}
                  error={error}
                />
              </div>
              {errMsg?.message && (
                <span
                  className={`text-sm ${
                    errMsg?.status == 'failed'
                      ? 'text-[#f64949fe]'
                      : 'text-[#2ba150fe]'
                  } mt-0.5`}
                >
                  {errMsg?.message}
                </span>
              )}
              <div className='flex items-center justify-between py-4'>
                <label
                  htmlFor='imgUpload'
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'
                >
                  <input
                    type='file'
                    onChange={(e) => setFile(e.target.files[0])}
                    className='hidden'
                    id='imgUpload'
                    data-max-size='5120'
                    accept='.jpg, .png, .jpeg'
                  />
                  <BiImages />
                  <span>Image</span>
                </label>

                <label
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'
                  htmlFor='videoUpload'
                >
                  <input
                    type='file'
                    data-max-size='5120'
                    onChange={(e) => setFile(e.target.files[0])}
                    className='hidden'
                    id='videoUpload'
                    accept='.mp4, .wav'
                  />
                  <BiSolidVideo />
                  <span>Video</span>
                </label>

                <label
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'
                  htmlFor='vgifUpload'
                >
                  <input
                    type='file'
                    data-max-size='5120'
                    onChange={(e) => setFile(e.target.files[0])}
                    className='hidden'
                    id='vgifUpload'
                    accept='.gif'
                  />
                  <BsFiletypeGif />
                  <span>Gif</span>
                </label>

                <div>
                  {posting ? (
                    <Loading />
                  ) : (
                    <button
                      type='submit'
                      className='bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm'
                    >
                      Post
                    </button>
                  )}
                </div>
              </div>
            </form>

            {loading ? (
              <Loading />
            ) : posts?.length > 0 ? (
              posts?.map((post) => (
                <PostCard
                  key={post?._id}
                  post={post}
                  user={user}
                  deletePost={handleDelete}
                  likePost={handleLikePost}
                />
              ))
            ) : (
              <div className='flex w-full h-full items-center justify-center'>
                <p className='text-lg text-ascent-2'>No Post Available</p>
              </div>
            )}
          </div>

          {/* right side  */}
          <div className='hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto'>
            {/* friends request */}
            <div className='w-full bg-primary shadow-sm rounded-lg px-6 py-5'>
              <div className='flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-[#666666]'>
                <span>Friend Request</span>
                <span>{friendRequest?.length}</span>
              </div>
              <div className='w-full flex flex-col gap-4 pt-4'>
                {friendRequest?.map(({ _id, requestFrom: from }) => (
                  <div key={_id} className='flex items-center justify-between'>
                    <Link
                      to={'/profile/' + from?._id}
                      className='w-full flex gap-4 items-center cursor-pointer'
                    >
                      <img
                        src={from?.profileUrl ?? NoProfile}
                        alt={from?.firstName}
                        className='w-10 h-10 object-cover rounded-full'
                      />
                      <div className='flex-1'>
                        <p className='text-base font-medium text-ascent-1'>
                          {from?.firstName} {from?.lastName}
                        </p>
                        <span className='text-sm text-ascent-2'>
                          {from?.profession ?? 'No Profession'}
                        </span>
                      </div>
                    </Link>
                    <div className='flex gap-1'>
                      <button
                        className='bg-[#044444] text-xs text-white px-1 py-1 rounded full'
                        onClick={() => acceptFriendRequest(_id, 'Accepted')}
                      >
                        Accept
                      </button>
                      <button
                        className='bg-[#044444] text-xs text-white px-1 py-1 rounded full'
                        onClick={() => acceptFriendRequest(_id, 'Accepted')}
                      >
                        Deny
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* suggested friends */}
            <div className='w-full bg-primary shadow-sm rounded-lg px-5 py-5'>
              <div className='flex items-center justify-between text-lg text-ascent-1 border-b border-[#66666645]'>
                <span>Friend Suggestion</span>
              </div>
              <div className='w-full flex flex-col gap-4 pt-4'>
                {suggestedFriends?.map((friend) => (
                  <div
                    className='flex items-center justify-between'
                    key={friend._id}
                  >
                    <Link
                      to={'/profile/' + friend?._id}
                      key={friend?._id}
                      className='w-full flex gap-4 items-center cursor-pointer'
                    >
                      <img
                        src={friend?.profileUrl ?? NoProfile}
                        alt={friend?.firstName}
                        className='w-10 h-10 object-cover rounded-full'
                      />
                      <div className='flex-1 '>
                        <p className='text-base font-medium text-ascent-1'>
                          {friend?.firstName} {friend?.lastName}
                        </p>
                        <span className='text-sm text-ascent-2'>
                          {friend?.profession ?? 'No Profession'}
                        </span>
                      </div>
                    </Link>

                    <div className='flex gap-1'>
                      <button
                        className='bg-[#0444a430] text-sm text-white p-1 rounded'
                        onClick={() => handleFriendRequest(friend?._id)}
                      >
                        <BsPersonFillAdd size={20} className='text-[#0f52b6]' />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {edit && <EditProfile />}
    </>
  )
}

export default HomePage
