const Login = () => {
  return (
    <div className="">
      <div className="flex justify-center p-4 flex-col">
        <h1 className="text-center font-mono text-4xl">Hello User</h1>
        <span className="text-center">Verify its you</span>
      </div>

      <div className="flex flex-col justify-center items-center gap-4">
          <input
            id="email"
            type="text"
            placeholder="Email Id"
            className="p-2 rounded-lg w-[300px] border-2"
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="p-2 rounded-lg w-[300px] border-2"
          />
      <button className="bg-blue-200 p-2 rounded-lg border-2 border-blue-600">
        Submit
      </button>
      </div>
    </div>
  )
}

export default Login
