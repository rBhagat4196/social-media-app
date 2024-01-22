import { useSelector } from 'react-redux'
import TopBar from '../components/TopBar'
const HomePage = () => {
  const { theme } = useSelector((state) => {
    return state.theme
  })
  return  <>
      <div className='w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden'>
        <TopBar />
      </div>
  </>
}

export default HomePage
