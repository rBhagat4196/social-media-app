import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice"
import themeSlice from "./themeSliceSlice"
import postSlice from "./postSliceSlice"

const rootReducer = combineReducers({
    user : userSlice,
    theme : themeSlice,
    posts : postSlice
});

export {rootReducer};