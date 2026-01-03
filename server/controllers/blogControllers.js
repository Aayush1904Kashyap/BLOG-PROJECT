import fs from "fs";
import imageKit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";


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
