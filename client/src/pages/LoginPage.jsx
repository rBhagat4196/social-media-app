import { useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

const LoginPage = () => {
  const [active, setActive] = useState('login')

  // Function to generate tab styles dynamically
  const getTabStyles = (tabName) => {
    const fixed = 'p-4 w-[100px] text-center rounded-lg cursor-pointer '
    if (tabName === active) return fixed + 'bg-orange-300'
    return fixed + 'bg-gray-300'
  }

  return (
    <>
    <div className=' h-[100vh] flex justify-center items-center '>
      <div className='hidden lg:block w-2/5'>
        <img src='/login page.jpg'/>
      </div>
      <div className='shadow-xl p-8 rounded-lg border-2 border-blue-700'>

      <div className="flex items-center justify-center gap-10 p-2 ">
        <span
          className={getTabStyles('login')}
          onClick={() => setActive('login')}
          >
          SignIn
        </span>
        <span
          className={getTabStyles('signup')}
          onClick={() => setActive('signup')}
          >
          SignUp
        </span>
      </div>

      {/* layout  */}
      {active == 'login' ? <Login /> : <Register />}
        </div>
    </div>
    </>
  )
}

export default LoginPage
