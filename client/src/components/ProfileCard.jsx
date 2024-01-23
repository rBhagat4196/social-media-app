/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import NoProfile from "../assets/userprofile.png"
const ProfileCard = ({user}) => {
//   const { user: data, edit } = useSelector((state) => state.user)
  console.log(user)
  const dispatch = useDispatch()
  return (
    <div>
      <div className='w-full bg-primary flex flex-col items-center shadow-sm rounded-xl px-6 py-4'>
        <div className='w-full flex items-center justify-between border-b pb-5 border-[#66666645]'>
            <Link to={"profile/"+user?._id} 
            className='flex gap-2'>
                <img src={user?.profileUrl ?? NoProfile} alt={user?.email} 
                className='w-14 h-14 object-cover rounded-full'></img>
                <div className='flex flex-col justify-center'>
                    <p className='text-lg font-medium text-ascent-1'>
                        {user?.firstName} {user?.lastName}
                    </p>
                </div>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
