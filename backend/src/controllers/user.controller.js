import { User } from "../models/user.model.js";

const registerUser = async (req, res)=>{
    try {
        const {username,email,password} = req.body;
        //basic validation
        if(!username || !email || !password){
            return res.status(400).json({message:"All fields are required!"});
        }
        //check if user exists
        const existing = await User.findOne({email:email.toLowerCase()});
        if(existing){
            return res.status(400).json({message:"User already exists!"});
        }
        //create user
        const user = await User.create({
            username,
            password,
            email: email.toLowerCase(),
            loggedIn:false
        });
        res.status(201).json({
            message:"User registered",
            user:{id:user._id,email:user.email,username:user.username}
        });
    } catch (error) {
        res.status(500).json({message:"Internal server error",error:error.message})
    }
}

const loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body
        //check if user exists
        const user = await User.findOne({
            email:email.toLowerCase()
        });
        if(!user) return res.status(400).json({
            message:"user not found"
        })
        //check if password is correct
        const isMatch = await user.comparePassword(password)
        if(!isMatch) return res.status(400).json({
            message:"Invalid credentials"
        })
        //successful login
        res.status(200).json({
            message:"Successfully logged in",
            user:{
                id:user._id,
                username:user.username,
                email:user.email
            }
        })
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
        console.log(error);
        
    }
}
const logoutUser = async(req,res)=>{
    try {
        const {email} = req.body
        const user = await User.findOne({
             email:email.toLowerCase()
        });
        if(!user) return res.status(400).json({
            message:"user not found"
        });
        res.status(200).json({
            message:"logout successful"
        });
    } catch (error) {
        res.status(500).json({
            message:"Internal server error",
        });
        console.log(error);
        
    }
}
export{
    registerUser,
    loginUser,
    logoutUser
}