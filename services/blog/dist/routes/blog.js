import exrpess from 'express';
import { getAllBlogs, getSingleBlog } from '../controllers/blog.js';
const router = exrpess.Router();
router.get("/blog/all", getAllBlogs);
router.get("/blog/:id", getSingleBlog);
export default router;
//# sourceMappingURL=blog.js.map