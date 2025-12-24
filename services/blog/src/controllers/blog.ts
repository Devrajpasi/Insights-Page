import type { AuthenticatedRequest } from "../middleware/isAuth.js";
import { redisClient } from "../server.js";
import TryCatch from "../utils/TryCatch.js";
import { sql } from "../utils/db.js";
import axios from "axios";


export const getAllBlogs=TryCatch(async(req,res)=>{
     const {searchQuery="",category=""}=req.query
     
     const cacheKey=`blogs:${searchQuery}:${category}`;

     const cached=await redisClient.get(cacheKey);

     if(cached){
       console.log("Serving from redis cache");
       res.json(JSON.parse(cached));
       return;
     }

    let blogs;

     if (searchQuery && category) {
    blogs = await sql`SELECT * FROM blogs WHERE (title ILIKE ${
      "%" + searchQuery + "%"
    } OR description ILIKE ${
      "%" + searchQuery + "%"
    }) AND category = ${category} ORDER BY create_at DESC`;
  } else if (searchQuery) {
    blogs = await sql`SELECT * FROM blogs WHERE (title ILIKE ${
      "%" + searchQuery + "%"
    } OR description ILIKE ${"%" + searchQuery + "%"}) ORDER BY create_at DESC`;
  } else if (category) {
    blogs =
      await sql`SELECT * FROM blogs WHERE category=${category} ORDER BY create_at DESC`;
  } else {
    blogs = await sql`SELECT * FROM blogs ORDER BY create_at DESC`;
  }

    
     
    console.log("Serving from database");

    await redisClient.set(cacheKey,JSON.stringify(blogs),{EX:3600});

    res.json(blogs);

});

export const getSingleBlog = TryCatch(async (req, res) => {

  const blogid=req.params.id;
  
  const cacheKey=`blog:${blogid}`;

  const cached=await redisClient.get(cacheKey);
  
   if(cached){
       console.log("Serving single blog from redis cache");
       res.json(JSON.parse(cached));
       return;
     }

  
  const blog = await sql`
    SELECT * FROM blogs WHERE id = ${blogid}
  `;

  if(blog.length==0){
    res.status(404).json({
      message:"no blog with this id"
    })
    return;
  }

 
  const { data } = await axios.get(
    `${process.env.USER_SERVICE}/api/v1/user/${blog[0]?.author}`
  );

  const responseData={
    blog: blog[0],
    author: data
  }

  await redisClient.set(cacheKey,JSON.stringify(responseData),{EX:3600})

  res.json({
    responseData
  });
});


export const addComment=TryCatch(async(req:AuthenticatedRequest,res)=>{
  const {id:blogid}=req.params;
  const {comment}=req.body;

  await sql`INSERT INTO comments (comment,blogid,userid,username) VALUES (${comment},${blogid},${req.user?._id},${req.user?.name}) RETURNING *`;

  res.json({
    message:"Comment Added",
  })
})

export const getAllComments=TryCatch(async(req , res)=>{
   const {id}=req.params;

   const comments=await sql`SELECT * FROM comments WHERE blogid = ${id} ORDER BY create_at DESC`;

   res.json({comments})
})

export const deleteComment=TryCatch(async(req:AuthenticatedRequest,res)=>{
    const {commentid}=req.params;

    const comment=await sql`SELECT * FROM comments WHERE id = ${commentid}`

    if(comment[0]?.userid !==req.user?._id){
      res.status(401).json({
        message:"You are not owner of this comment"
      })
      return;
    }

    await sql`DELETE FROM comments WHERE id = ${commentid}`

    res.json({
      message:"Comment Deleted"
    })


})