/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux'
import TopBar from '../components/TopBar'
import ProfileCard from '../components/ProfileCard'
import FriendCard from '../components/FriendCard'
import { friends , requests} from '../assets/userInfo'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import NoProfile from '../assets/userprofile.png'
import { BsPersonFillAdd } from 'react-icons/bs'
const HomePage = () => {
  const {user} = useSelector((state)=>state.user);
  const [friendRequest,setFriendRequest] = useState(requests)
  const [suggestedFriends,setSuggestedFriends] = useState(friends)
  return  <>
      <div className='w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden'>
        {/* tobbar */}
        <TopBar />
        <div className='w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full'>
          {/* left side */}
          <div className='hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto'>
            <ProfileCard user={user}/>
            <FriendCard friends = {user?.friends}/>
          </div>
          {/* center  */}
          <div className='flex flex-1 h-full bg-primary px-4 flex-col gap-6 overflow-y-auto'>

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
                {friendRequest?.map(({_id,requestFrom : from})=>(
                  <div key={_id}
                  className='flex items-center justify-between'>
                    <Link to={"/profile"+from?._id} className='w-full flex gap-4 items-center cursor-pointer'>
                      <img src={from?.profileUrl ?? NoProfile }
                      alt={from?.firstName}
                      className='w-10 h-10 object-cover rounded-full'
                      />
                      <div className='flex-1'>
                        <p className='text-base font-medium text-ascent-1'>
                          {from?.firstName} {from?.lastName}
                        </p>
                        <span className='text-sm text-ascent-2'>
                          {from?.profession ?? "No Profession"}
                        </span>
                      </div>
                    </Link>
                    <div className='flex gap-1'>
                      <button className='bg-[#044444] text-xs text-white px-1 py-1 rounded full'>
                        Accept
                      </button>
                      <button className='bg-[#044444] text-xs text-white px-1 py-1 rounded full'>
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
                      to={"/profile/" + friend?._id}
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
                          {friend?.profession ?? "No Profession"}
                        </span>
                      </div>
                    </Link>

                    <div className='flex gap-1'>
                      <button
                        className='bg-[#0444a430] text-sm text-white p-1 rounded'
                        onClick={() => {}}
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
  </>
}

export default HomePage
