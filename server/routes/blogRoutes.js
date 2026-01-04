import express from 'express';
import { addBlog ,getAllBlogs,getBlogById,deleteBlogbyId,togglePublish, addComment, getBlogComments} from '../controllers/blogControllers.js';

import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';

const blogRouter = express.Router();

blogRouter.post("/add",auth,upload.single('image'),addBlog);

blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogById);
blogRouter.post("/delete", auth, deleteBlogbyId);
blogRouter.post("/toggle-publish", auth, togglePublish);

blogRouter.post('/add-comment',addComment)
blogRouter.post('/comment',getBlogComments)

export default blogRouter;
