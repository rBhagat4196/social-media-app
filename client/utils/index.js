/* eslint-disable no-unused-vars */
import axios from "axios"
import { getPosts } from "../src/redux/postSlice"
const APP_URL = "http://localhost:8800"

export const API = axios.create({
    baseURL : APP_URL,
    responseType : "json"
})

export const apiRequest = async({url,token,data,method}) =>{

    try{
        const result = await API(url,{
            method : method || "GET",
            data : data,
            headers : {
                "Content-Type" : "application/json",
                Authorization : token? `Bearer ${token}` : "",
            }
        })
        return result?.data;
    }catch(error){
        const err = error.response.data;
        console.log(err)
        return { status :err.success , message : err.message };
    }
}

export const handleFileUpload = async(uploadFile)=>{
    const formData = new FormData();
    formData.append("file",uploadFile);
    formData.append("upload_preset"	,"social-media");
    formData.append("cloud_name","dv8623aqf")

    try{
        const response = await axios.post("https://api.cloudinary.com/v1_1/dv8623aqf/image/upload",formData)
        return response.data.url;
    }catch(error){
        console.log(error)
    }
}

export const fetchPosts = async(token,dispatch,uri,data)=>{
    try{
        const res = await apiRequest({
            url : uri || "/posts",
            token : token,
            method : "POST",
            data : data || {}
        });
        dispatch(getPosts(res?.data));
    }catch(error){
        console.log(error)
    }
}

export const likePost = async({uri,token})=>{
    try{
        const res = await apiRequest({
            url : uri,
            token : token,
            method : "POST",
        });
        return res;
    }catch(error){
        console.log(error)
    }
}

export const deletePost = async(id,token)=>{
    try{
        await apiRequest({
            url:"/posts/"+id,
            token : token,
            method : "DELETE",
        });
        // console.log("working")
        return;
    }catch(error){
        console.log(error)
    }
}

export const getUserInfo = async(token,id) => {
    try{
        const uri = id===undefined ? "users/get-user" : "/users/get-user/"+id;
        const res = await apiRequest({
            url : uri,
            token : token,
            method : "POST"
        });

        if(res?.message === "Authentication Failed"){
            localStorage.removeItem("user");
            window.alert("User session expired . Login again");
            window.location.replace("/login");
        }
      return res?.user
    }
    catch(e){
        console.log(e)
    }
}

export const sendFriendRequest = async(token,id)=>{
    try{
        const res = await apiRequest({
            url : "users/friend-request",
            token : token,
            method : "POST",
            data : {
                requestTo : id
            }
        })
        return res;
    }
    catch(error){
        console.log(error);
    }
}

export const viewUserProfile = async(token,id)=>{
    try{
        const res = await apiRequest({
            url : "users/profile-view",
            token : token,
            method : "POST",
            data : { id}
        })
        return res;
    }
    catch(error){
        console.log(error);
    }
}