/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "./TextInput";
import Loading from "./Loading";
import { login, updateProfile } from "../redux/userSlice";
import { apiRequest, handleFileUpload } from "../../utils";

const EditProfile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [picture, setPicture] = useState(null);
  const [errors,setErrors] = useState({
    firstName : "",
    lastName : "",
    profession : "",
    location : ""
  })
  const [data,setData] = useState({
    firstName : user?.firstName,
    lastName : user?.lastName,
    profession : user?.profession,
    location : user?.location,
  })
  const Submit = async (e) => {
    e.preventDefault();
    if(!data.firstName || !data.lastName || !data.profession || !data.location ){
        setErrors({
            firstName : !data.firstName ? "First name is required " : "",
            lastName : !data.lastName ? "Last name is required" : "",
            profession : !data.profession ? "Profession does not match" : "",
            location : !data.location ? "Location does not match" : ""
        })
        return;
    }
    setIsSubmitting(true);
    setErrMsg("");
    try{
      const uri = picture && (await handleFileUpload(picture));
      const {firstName,lastName,profession,location} = data;

      const res = await apiRequest({
        url : "/users/update-user",
        data :{
          firstName,
          lastName,
          profession,
          location,
          profileUrl : uri ? uri : user?.profileUrl
        },
        method : "PUT",
        token : user?.token,
      })

      if(res?.status === "failed"){
        setErrMsg(res);
        setIsSubmitting(false);
      }else{
        setErrMsg("");
        const newUser = {token : res?.token , ...res?.user};
        dispatch(login(newUser));

        setTimeout(()=>{
          dispatch(updateProfile(false));
          setIsSubmitting(false);
        },5000)
      }
    }catch(e){
      setIsSubmitting(false);
      console.log(e)
    }
  };

  const handleClose = () => {
    dispatch(updateProfile(false));
  };
  const handleSelect = (e) => {
    setPicture(e.target.files[0]);
  };

  const handleInput = (name,value)=>{
    setData({
        ...data,
        [name] : value
    })
    setErrors({
        ...errors,
        [name] : ''
    })
  }

  return (
    <>
      <div className='fixed z-50 inset-0 overflow-y-auto'>
        <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <div className='fixed inset-0 transition-opacity'>
            <div className='absolute inset-0 bg-[#000] opacity-70'></div>
          </div>
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen'></span>
          &#8203;
          <div
            className='inline-block align-bottom bg-primary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
            role='dialog'
            aria-modal='true'
            aria-labelledby='modal-headline'
          >
            <div className='flex justify-between px-6 pt-5 pb-2'>
              <label
                htmlFor='name'
                className='block font-medium text-xl text-ascent-1 text-left'
              >
                Edit Profile
              </label>

              <button className='text-ascent-1' onClick={handleClose}>
                <MdClose size={22} />
              </button>
            </div>
            <form
              className='px-4 sm:px-6 flex flex-col gap-3 2xl:gap-6'
              onSubmit={(e)=> Submit(e)}
            >
              <TextInput
                name='firstName'
                label='First Name'
                placeholder='First Name'
                type='text'
                styles='w-full'
                value={data.firstName}
                onChange={(e) => handleInput('firstName',e.target.value)}
                error={errors.firstName}
              />

              <TextInput
                label='Last Name'
                placeholder='Last Name'
                type='lastName'
                styles='w-full'
                value={data.lastName}
                onChange={(e)=> handleInput('lastName',e.target.value)}
                error={errors.lastName}
              />

              <TextInput
                name='profession'
                label='Profession'
                placeholder='Profession'
                type='text'
                styles='w-full'
                value={data.profession}
                onChange={(e) => handleInput('profession',e.target.value)}
                error={errors.profession}
              />

              <TextInput
                label='Location'
                placeholder='Location'
                type='text'
                styles='w-full'
                value={data.location}
                onChange={(e)=> handleInput('location',e.target.value)}
                error={errors.location}
              />

              <label
                className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4'
                htmlFor='imgUpload'
              >
                <input
                  type='file'
                  className=''
                  id='imgUpload'
                  onChange={(e) => handleSelect(e)}
                  accept='.jpg, .png, .jpeg'
                />
              </label>

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

              <div className='py-5 sm:flex sm:flex-row-reverse border-t border-[#66666645]'>
                {isSubmitting ? (
                  <Loading />
                ) : (
                  <button
                    className={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`}
                  >
                  Submit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;