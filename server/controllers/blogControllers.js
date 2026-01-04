import fs from "fs";
import imageKit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comments.js";


export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = req.body;
    const imgFile = req.file;

    if (!title || !description || !category || !imgFile) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const fileBuffer = fs.readFileSync(imgFile.path);

    const uploadResponse = await imageKit.upload({
      file: fileBuffer,
      fileName: imgFile.originalname,
      folder: "/blogs",
    });

    const image = imageKit.url({
      path: uploadResponse.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished: isPublished === "true",
    });

    res.json({
      success: true,
      message: "Blog added successfully",
    });
  } catch (error) {
    console.error("ADD BLOG ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({
      success: true,
       blogs
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { blogId} =req.params;
    const blog = await Blog.findById(blogId);
    if(!blog){
      return res.json({
        success:false,
        message:"Blog not found"
      })
    }
    res.json({
      success:true,
      blog
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}

export const deleteBlogbyId = async (req, res) => {
  try {
    const { id} =req.params;
    await Blog.findByIdAndDelete(id);

    await Comment.deleteMany({blog:id})

    res.json({
      success:true,
      message:"Blog deleted successfully"
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;

    // 1. Validate ID existence
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Blog ID is required",
      });
    }

    const blog = await Blog.findById(id);

    // 2. Blog existence check
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // 3. Toggle publish status
    blog.isPublished = !blog.isPublished;
    await blog.save();

    res.status(200).json({
      success: true,
      message: `Blog ${blog.isPublished ? "published" : "unpublished"} successfully`,
      isPublished: blog.isPublished,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addComment =async (req, res) =>{
  try {
      const {blog, name, content} =req.body;
      await Comment.create({blog,name,content});
      res.json({success:true, message: 'Comment added for review'})
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const getBlogComments =async (req, res) =>{
  try {
      const {blogId} =req.body;
      const comments =(await Comment.find({blog:blogId,isApproved:true})).sort({createdAt:-1});
      res.json({success:true, comments})

  } catch (error) {
    
  }
}