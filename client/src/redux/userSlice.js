import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme : JSON.parse(window?.localStorage.getItem("user")) ?? {},
    edit:false,
};

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers:{
        login : (state,action)=>{
            state.user = action.payload;
            localStorage.setItem("user" ,JSON.stringify(action.payload));
        },
        logout : (state)=>{
            state.user = null,
            localStorage?.removeItem("user");
        },
        updateProfile : (state,action)=>{
            state.edit = action.payload
        }
    }
})

export default userSlice.reducer;

export function UserLogin(user){
    return (dispatch)=>{
        dispatch(userSlice.actions.login(user))
    }
}

export function Logout(){
    return (dispatch)=>{
        dispatch(userSlice.actions.logout())
    }
}
export function Updataprofile(user){
    return (dispatch)=>{
        dispatch(userSlice.actions.updateProfile(user))
    }
}

