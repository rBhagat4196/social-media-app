import { useSelector } from 'react-redux'
import TopBar from '../components/TopBar'
import ProfileCard from '../components/ProfileCard'
const HomePage = () => {
  const {user} = useSelector((state)=>state.user)
  return  <>
      <div className='w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden'>
        {/* tobbar */}
        <TopBar />
        <div className='w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full'>
          {/* left side */}
          <div className='hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto'>
            <ProfileCard user={user}/>
          </div>
          {/* center  */}
          <div></div>
          {/* right side  */}
          <div></div>
        </div>
      </div>
  </>
}

export default HomePage
