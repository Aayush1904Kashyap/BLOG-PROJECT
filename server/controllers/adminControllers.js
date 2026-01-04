import jwt from 'jsonwebtoken';
import Blog from '../models/Blog.js';
import Comment from '../models/Comments.js';
import { memoryStorage } from 'multer';

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid Admin Credentials",
      });
    }

    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAllBlogAdmin = async (req, res) =>{
  try {
    const blogs = await Blog.find({}).sort({createdAt:-1});
    res.json({success:true,blogs})
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
} 

export const getAllComments = async (req,res) =>{
  try {
    const comments = await Comment.find({}).populate("blog").sort({createdAt:-1});
    res.json({success:true,comments})
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const getDashboard = async (req,res) =>{
  try {
    const recentBlogs = await Blog.find({}).sort({createdAt:-1}).limit(5);
    const blogs= await Blog.countDocuments();
    const comments= await Comment.countDocuments();
    const drafts= await Blog.countDocuments({isPublished:false});

    const dashboardData ={
      blogs,comments,drafts,recentBlogs
    }

    res.json({
      success:true,
      dashboardData
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const deleteCommentbyId = async (req,res) =>{
  try {
    
    const {id}=req.body;
    await Comment.findByIdAndDelete(id);
     res.json({
      success:true,
      message:"Comment deleted Successfully"
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const approveCommentbyId = async (req,res) =>{
  try {
    
    const {id}=req.body;
    await Comment.findByIdAndUpdate(id ,{isApproved:true});
     res.json({
      success:true,
      message:"Comment Approved Successfully"
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}