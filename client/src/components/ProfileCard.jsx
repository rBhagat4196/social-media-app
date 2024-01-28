/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import NoProfile from '../assets/userprofile.png'
import { LiaEditSolid } from 'react-icons/lia'
import { updateProfile } from '../redux/userSlice'
import { FaLinkedin } from 'react-icons/fa'
import { SiGithub } from 'react-icons/si'
import { SiGeeksforgeeks } from 'react-icons/si'
import moment from 'moment'
import { BsBriefcase, BsPersonFillAdd } from 'react-icons/bs'
import { CiLocationOn } from 'react-icons/ci'
const ProfileCard = ({ user }) => {
  const { user: data, edit } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  return (
    <div>
      <div className='w-full bg-primary flex flex-col items-center shadow-sm rounded-xl px-6 py-4'>
        <div className='w-full flex items-center justify-between border-b pb-5 border-[#66666645]'>
          <Link to={'/profile/' + user?._id} className='flex gap-2'>
            <img
              src={user?.profileUrl ?? NoProfile}
              alt={user?.email}
              className='w-14 h-14 object-cover rounded-full'
            ></img>
            <div className='flex flex-col justify-center'>
              <p className='text-lg font-medium text-ascent-1'>
                {user?.firstName} {user?.lastName}
              </p>
              <span className='text-ascent-2'>
                {user?.profession ?? 'No Profession'}
              </span>
            </div>
          </Link>
          <div>
            {user?._id === data?._id ? (
              <LiaEditSolid
                size={22}
                className='text-blue cursor-pointer'
                onClick={() => dispatch(updateProfile({ payload: true }))}
              />
            ) : (
              <button
                className='bg-[#0444a430] text-sm text-white p-1 rounded'
                onClick={() => {}}
              >
                <BsPersonFillAdd size={20} className='text-[#0f52b6]' />
              </button>
            )}
          </div>
        </div>
        <div className='w-full flex flex-col gap-2 py-4 border-b border-[#666666]'>
          <div className='flex gap-2 items-center text-ascent-1'>
            <CiLocationOn className='text-xl text-ascent-1' />
            <span>{user?.location ?? 'Add Location'}</span>
          </div>
          <div className='flex gap-2 items-center text-ascent-2'>
            <BsBriefcase className='text-xl text-ascent-1' />
            <span>{user?.profession ?? 'Add Profession'}</span>
          </div>
        </div>
        <div className='w-full flex flex-col gap-2 py-4 border-b border-[#666666]'>
          <p className='text-xl text-ascent-1 font-semibold'>
            {user?.friends?.length} Friends
          </p>
          <div className='flex items-center justify-between'>
            <span className='text-ascent-2'>Who viewed your profile</span>
            <span className='text-ascent-1 text-lg'>{user?.views?.length}</span>
          </div>
          <span className='text-base text-blue'>
            {user?.verified ? 'Verified Account' : 'Not Verified'}
          </span>
          <div className='flex items-center justify-between'>
            <span className='text-ascent-2'>Joined</span>
            <span className='text-ascent-1 text-base'>
              {moment(user?.createdAt).fromNow()}
            </span>
          </div>
          <div className='w-full flex flex-col gap-4 py-4 pb-6'>
            <p className='text-ascent-1 text-lg font-semibold'>
              Social Profile
            </p>

            <a
              href='https://github.com/rBhagat4196/social-media-app'
              target='_blank'
              rel='noopener noreferrer'
            >
              <div className='flex gap-2 items-center text-ascent-2'>
                <SiGithub className=' text-xl text-ascent-1' />
                <span>GitHub</span>
              </div>
            </a>

            <a
              href='https://www.linkedin.com/in/dev-rahulb/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <div className='flex gap-2 items-center text-ascent-2'>
                <FaLinkedin className=' text-xl text-ascent-1' />
                <span>Linkedin</span>
              </div>
            </a>

            <a
              href='https://auth.geeksforgeeks.org/user/rahulbhagat13slr/practice'
              target='_blank'
              rel='noopener noreferrer'
            >
              <div className='flex gap-2 items-center text-ascent-2'>
                <SiGeeksforgeeks className=' text-xl text-ascent-1' />
                <span>GeeskForGeeks</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
