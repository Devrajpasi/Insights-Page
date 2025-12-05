import type { AuthenticatedRequest } from "../middleware/isAuth.js";
import TryCatch from "../utils/TryCatch.js";


export const createBlog=TryCatch(async(req:AuthenticatedRequest,res)=>{
    const {title,description,blogcontent,category}=req.body;

    


});