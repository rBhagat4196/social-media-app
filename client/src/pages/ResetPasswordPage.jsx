import { useState } from "react";
import Loading from "../components/Loading"
import TextInput from "../components/TextInput"
import {apiRequest} from "../../utils/index"
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error,setError] = useState("")
  const handleInputChange = (name, value) => {
    setEmail(value);
    setError("")
  };

  const Submit = async (e) => {
    e.preventDefault();
    if(!email){
      setError("Email is required");
      return;
    }
    setIsSubmitting(true)
    // Handle form submission logic here
    try{
      const res = await apiRequest({
        url : "/users/request-passwordreset",
        data : {email},
        method : "POST"
      });

      if(res){
        setErrMsg(res);
        // console.log(res)
      }
      setIsSubmitting(false);
    }catch(e){
      console.log(e);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-bgColor flex items-center justify-center p-6">
      <div className="bg-primary w-full md:w-1/3 2xl:w-1/4 px-6 py-8 shadow-md rounded-lg">
        <p className="text-ascent-1 text-lg font-semibold">Email Address</p>

        <span className="text-sm text-ascent-2">
          Enter email address used during registration
        </span>

        <form onSubmit={(e) => Submit(e)} className="py-4 flex flex-col gap-5">
          <TextInput
            type="email"
            placeholder="email@example.com"
            styles="w-full rounded-lg"
            value={email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            error={error}
          />

          {errMsg?.message && (
            <span
              role="alert"
              className={`text-sm ${
                errMsg?.status === "failed" ? "text-[#f64949fe]" : "text-[#2ba150fe]"
              } mt-0.5`}
            >
              {errMsg?.message}
            </span>
          )}

          {isSubmitting ? (
            <Loading />
          ) : (
            <button
              type="submit"
              className="inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
