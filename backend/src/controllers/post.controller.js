import { Post } from "../models/post.model.js";

//create post
const createPost = async (req,res)=>{
    try {
        const {name,description,age} = req.body;

        if (!name || !description || !age) return res.status(400).json({
            message:"All fields are required"
        });

        const post = await Post.create({name,description,age})

        res.status(201).json({
            message:"Post created successfully",post
        })

    } catch (error) {
        res.status(500).json({
            message:"Internal server error"
        })
        console.log(error);
    }
}
//get all posts
const getposts = async (req,res)=>{
    try {
        const posts = await Post.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({
            message:"Internal server Error"
        })
        console.log(error);
    }
}
//update post
const updatepost = async(req,res)=>{
    try {
        //check if body is empty
        if(Object.keys(req.body).length === 0) return res.status(400).json({
            message:"No data provided for update"
        });
        const post = await Post.findByIdAndUpdate(req.params.id,req.body,{new:true});

        if (!post) return res.status(404).json({
            message:"Post not found"
        });
        res.status(200).json({
            message:"Post updated successfully"
        })
    } catch (error) {
         res.status(500).json({
            message:"Internal server Error"
        })
        console.log(error);
    }
}
//delete post
const deletepost = async(req,res)=>{
    try {
        const deleted = await Post.findByIdAndDelete(req.params.id);
        if(!deleted) return res.status(404).json({
            message:"post not found"
        });
        res.status(200).json({
            message:"post deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal server Error"
        })
        console.log(error);
    }
}
export{
    createPost,
    getposts,
    updatepost,
    deletepost
}