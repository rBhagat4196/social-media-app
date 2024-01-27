// Register.js
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsShare } from 'react-icons/bs'
import { AiOutlineInteraction } from 'react-icons/ai'
import { ImConnection } from 'react-icons/im'
import TextInput from '../components/TextInput'
import Loading from '../components/Loading'
import BgImage from '../assets/bg-image.webp'
import { apiRequest } from '../../utils'
const RegisterPage = () => {
  const [errMsg, setErrMsg] = useState("");
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })

    setErrors({
      ...errors,
      [name]: '',
    })
  }

  const onSubmit = async () => {
    if (!formData.firstName || !formData.email || !formData.password) {
      setErrors({
        firstName: !formData.firstName ? 'First name is required' : '',
        lastName: !formData.lastName ? 'Last name is required' : '',
        email: !formData.email ? 'Email is required' : '',
        password: !formData.password ? 'Password is required' : '',
      })
      return;
    }

    setIsSubmitting(true)
    try {
      const res = await apiRequest({
        url: '/auth/register',
        data: formData,
        method: 'POST',
      });

      if(res?.status === "failed"){
        setErrMsg(res);
      }
      else if (res?.status === "pending"){
        setErrMsg(res);
      }
      else{
        setErrMsg(res);
        setTimeout(()=>{
          window.location.replace("/login");
        },5000)
      }
      setIsSubmitting(false);
      // console.log(errMsg)
    } catch (e) {
      console.log(e);
      setIsSubmitting(false)
    }
  }

  return (
    <div className='bg-bgColor w-full h-[100vh] flex items-center justify-center p-6'>
      <div className='w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex bg-primary rounded-xl overflow-hidden shadow-xl'>
        {/* LEFT */}
        <div className='w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center'>
          <div className='w-full flex gap-2 items-center mb-6'>
            <div className='p-2 rounded text-white'>
              {/* Replace with your icon or image */}
              <img
                src='/reshot-icon-flickr-PTXY7M2H6V.svg'
                className='w-[50px]'
                alt='Icon'
              />
            </div>
            <span className='text-2xl text-[#065ad8] font-semibold'>
              ShareFun
            </span>
          </div>

          <p className='text-ascent-1 text-base font-semibold'>
            Create your account
          </p>
          <span className='text-sm mt-2 text-ascent-2'>
            Get started with us today
          </span>

          <form
            className='py-8 flex flex-col gap-5'
            onSubmit={(e) => {
              e.preventDefault()
              onSubmit()
            }}
          >
            {/* Username TextInput */}
            <div className='w-full flex gap-2 mt-2'>
              <TextInput
                type='text'
                placeholder='First name'
                styles='w-full rounded-xl bg-secondary border border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666]'
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                error={errors.firstName}
              />
              <TextInput
                type='text'
                placeholder='Last name'
                styles='w-full rounded-xl bg-secondary border border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666]'
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                error={errors.lastName}
              />
            </div>

            {/* Email TextInput */}
            <div className='w-full flex flex-col mt-2'>
              <TextInput
                type='email'
                placeholder='email@example.com'
                styles='w-full rounded-full bg-secondary border border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666]'
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
              />
            </div>

            {/* Password TextInput */}
            <div className='w-full flex flex-col mt-2'>
              <TextInput
                type='password'
                placeholder='Password'
                styles='w-full rounded-full bg-secondary border border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666]'
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                error={errors.password}
              />
            </div>

            {errMsg?.message && (
              <span
                className={`text-sm ${
                  errMsg?.status == "failed"
                    ? "text-[#f64949fe]"
                    : "text-[#2ba150fe]"
                } mt-0.5`}
              >
                {errMsg?.message}
              </span>
            )}
            {/* Submit Button */}
            {isSubmitting ? (
              <Loading />
            ) : (
              <button
                type='submit'
                className='mx-2 inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none'
              >
                Register
              </button>
            )}
          </form>

          {/* Already have an account Link */}
          <p className='text-ascent-2 text-sm text-center'>
            Already have an account?
            <Link
              to='/login'
              className='text-[#065ad8] font-semibold ml-2 cursor-pointer'
            >
              Login
            </Link>
          </p>
        </div>
        {/* RIGHT */}
        <div className='hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-blue'>
          <div className='relative w-full flex items-center justify-center'>
            <img
              src={BgImage}
              alt='Bg Image'
              className='w-48 2xl:w-64 h-48 2xl:h-64 rounded-full object-cover'
            />

            <div className='absolute flex items-center gap-1 bg-white right-10 top-10 py-2 px-5 rounded-full'>
              <BsShare size={14} />
              <span className='text-xs font-medium'>Share</span>
            </div>

            <div className='absolute flex items-center gap-1 bg-white left-10 top-6 py-2 px-5 rounded-full'>
              <ImConnection />
              <span className='text-xs font-medium'>Connect</span>
            </div>

            <div className='absolute flex items-center gap-1 bg-white left-12 bottom-6 py-2 px-5 rounded-full'>
              <AiOutlineInteraction />
              <span className='text-xs font-medium'>Interact</span>
            </div>
          </div>

          <div className='mt-16 text-center'>
            <p className='text-white text-base'>
              Connect with friends & have fun sharing
            </p>
            <span className='text-sm text-white/80'>
              Share memories with friends and the world.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
