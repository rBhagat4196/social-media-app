import Users from "../models/userModel";
import { hashString } from "../utils";

export const register = async(req,res,next)=>{
    const {firstName , lastName , email , password } = req.body

    // validate field
    if(!(firstName || lastName || email || password)){
        next("Provide Required Fields");  // passes argument through next
        return;
    }

    try{
        const userExist = await Users.findOne({email});

        if(userExist){
            next("Email Address Already Exist");
            return;
        }
        const hashedPassword = await hashString(password);
        const User = await Users.create({
            firstName,
            lastName,
            email,
            password : hashedPassword
        })

        
    }
    catch(error){
        console.log(error)
        res.status(404).json({message : error.message})
    }

}