/* eslint-disable no-unused-vars */
import  { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TextInput from "./TextInput";
import { setTheme } from "../redux/themeSlice";
import { logout } from "../redux/userSlice";
import { BsMoon , BsSunFill } from "react-icons/bs";
import {fetchPosts} from "../../utils/index"
const TopBar = () => {
  const { theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleTheme = () => {
    const themeValue = theme === "light" ? "dark" : "light";
    dispatch(setTheme(themeValue));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
     await fetchPosts(user?.token , dispatch , "",{search});
    
  };


  return (
    <div className="topbar w-full flex items-center justify-between py-3 md:py-6 px-4 bg-primary">
      <Link to="/" className="flex gap-2 items-center">
        <div className="p-1 md:p-2 rounded text-white">
          <img src="/reshot-icon-flickr-PTXY7M2H6V.svg" className="w-[30px]"></img>
        </div>
        <span className="text-xl md:text-2xl text-[#065ad8] font-semibold">
          ShareFun
        </span>
      </Link>

      <form className="hidden md:flex items-center justify-center" onSubmit={(e) => handleSearch(e)}>
        <TextInput
          placeholder="Search..."
          styles="w-[18rem] lg:w-[38rem]  rounded-l-full py-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
        />
        <button
          type="submit"
          className="bg-[#0444a4] text-white px-6 py-2.5 mt-2 rounded-r-full"
        >
          Search
        </button>
      </form>

      {/* ICONS */}
      <div className="flex gap-4 items-center text-ascent-1 text-md md:text-xl">
        <button onClick={handleTheme}>
          {theme=='light' ? <BsMoon /> : <BsSunFill />}
        </button>
        <div className="hidden lg:flex">
          {/* Add your notification icon here */}
        </div>

        <div>
          <button
            onClick={() => dispatch(logout())}
            className="text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
