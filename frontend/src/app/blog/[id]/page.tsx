"use client"
import Loading from "@/components/loading"
import { author_service, Blog, blog_service, useAppData, User } from "@/context/AppContext"
import { useParams, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Link from "next/link"
import { BookmarkCheck, BookMarked, Edit, Trash2, Trash2Icon, User2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Cookies from "js-cookie"
import toast from "react-hot-toast"
import { error } from "console"





interface Comment {
    id: string;
    comment: string;
    blogid: number;
    userid: string;
    username: string;
    create_at: string;
}

interface CommentResponse {
    comments: Comment[];
}


const BlogPage = () => {

    const { isAuth, user,fetchBlogs ,savedBlogs,getSavedBlogs} = useAppData();
    const router = useRouter()
    const { id } = useParams();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [author, setAuthor] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    const [comments, setComments] = useState<Comment[]>([])

    async function fetchSingleBlog() {
        if(!id) return;
        try {
            setLoading(true);
            const { data } = await axios.get<SingleBlogResponse>(`${blog_service}/api/v1/blog/${id}`)

            setBlog(data.blog)
            setAuthor(data.author)
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }

    }

     useEffect(() => {
        if(!id) return;

        fetchSingleBlog()
    }, [id]);

    async function fetchComment() {
        if(!id){
            return;
        }

        try {
            setLoading(true);




            const token = Cookies.get("token")
            const { data } = await axios.get<CommentResponse>(`${blog_service}/api/v1/comment/${id}`)


            setComments(data.comments)
        } catch (error) {
            console.log(error);

        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(!id){
            return;
        }
        fetchComment()
    }, [id])

    const [comment, setComment] = useState("")
    async function addComment() {
        try {
            setLoading(true);
            interface AddCommentResponse {
                message: string;
            }

            const token = Cookies.get("token")
            const { data } = await axios.post<AddCommentResponse>(`${blog_service}/api/v1/comment/${id}`, { comment }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            toast.success(data.message);
            setComment("")
            fetchComment()
        } catch (error) {
            console.log(error);
            toast.error("problem while adding comment")
        }
        finally {
            setLoading(false);
        }
    }


    interface SingleBlogResponse {
        blog: Blog;
        author: User;
    }


    

    const deleteComment = async (id: string) => {
        if (confirm("Are you sure you want to delete this comment")) {
            try {
                setLoading(true);
                interface deleteResponse {
                    message: string;
                }
                const token = Cookies.get("token");
                const { data } = await axios.delete<deleteResponse>(
                    `${blog_service}/api/v1/comment/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                toast.success(data.message);
                fetchComment();
            } catch (error) {
                toast.error("Problem while deleting comment");
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

    }

    

    async function deleteBlog(){
          if (confirm("Are you sure you want to delete this blog")) {
      try {
        setLoading(true);
        const token = Cookies.get("token");
         interface deleteResponse {
                    message: string;
                }
        const { data } = await axios.delete<deleteResponse>(
          `${author_service}/api/v1/blog/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(data.message);
        router.push("/blogs");
        setTimeout(() => {
          fetchBlogs();
        }, 4000);
      } catch (error) {
        toast.error("Problem while deleting blog");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    }


    const [saved,setSaved]=useState(false);

    useEffect(()=>{
         if(savedBlogs && savedBlogs.some((b)=> b.blogid===id)){
             setSaved(true)
         }
         else{
            setSaved(false);
         }
    },[savedBlogs,id])

   async function savedBlog(){
    const token=Cookies.get("token")
    

    try {
        setLoading(true)
        interface saveBlogResponse{
            message:string;
        }
        const {data}=await axios.post<saveBlogResponse>(`${blog_service}/api/v1/save/${id}`,{},{
            headers:{
                Authorization:`Bearer ${token}`,
            }
        })

        toast.success(data.message)
        setSaved(!saved)
        getSavedBlogs();
        
    } catch (error) {
       console.log(error)
      toast.error("Problem while saving blog")
    }
    finally{
        setLoading(false);
    }
   }

   

    if (!blog) {
        return <Loading />
    }


    return <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card>
            <CardHeader>
                <h1 className="text-3xl font-bold text-gray-900">{blog.title}</h1>
                <p className="text-gray-600 mt-2 flex items-center ">
                    <Link className="flex items-center gap-2" href={`/profile/${author?._id}`}> <img src={author?.image} className="w-8 h-8 rounded-full" alt="" />{author?.name}</Link>
                    {
                        isAuth && <Button variant={"ghost"} className="mx-3" size={"lg"} disabled={loading} onClick={savedBlog} >{saved ? <BookmarkCheck/> :<BookMarked></BookMarked> }</Button>
                    }

                    {
                        blog.author === user?._id &&
                        <>
                            <Button size={"sm"} onClick={() => router.push(`/blog/edit/${id}`)}><Edit /></Button>
                            <Button variant={"destructive"} className="mx-2" size={"sm"} onClick={deleteBlog} disabled={loading}><Trash2Icon /></Button>
                        </>
                    }
                </p>
            </CardHeader>
            <CardContent>
                <img
                    src={blog.image}
                    alt=""
                    className="w-full h-64 object-cover rounded-lg mb-4"
                />

                <p className="text-lg text-gray-700 mb-4">{blog.description}</p>
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog.blogcontent }} />
            </CardContent>
        </Card>

        {
            isAuth && <Card>
                <CardHeader>
                    <h3 className="text-xl font-semibold">Leave a Comment</h3>
                </CardHeader>
                <CardContent>
                    <Label htmlFor="comment" >
                        Your Comment
                    </Label>
                    <Input id="comment" placeholder="Type you comment here" className="my-2" value={comment} onChange={(e) => setComment(e.target.value)}></Input>
                    <Button onClick={addComment} disabled={loading}> {loading ? "Adding Comment" : "Post Comment"}</Button>
                </CardContent>
            </Card>
        }

        <Card>
            <CardHeader>
                <h3 className="text-lg font-medium">All Comments</h3>
            </CardHeader>
            <CardContent>
                {
                    comments && comments.length > 0 ? comments.map((e, i) => {
                        return <div key={i} className="border-b py-2 flex items-center gap-3">
                            <div>
                                <p className="font-semibold flex items-center gap-1">
                                    <span className="user border border-gray-400 rounded-full p-1">
                                        <User2>
                                        </User2>
                                    </span>
                                    {e.username}

                                </p>
                                <p>{e.comment}</p>
                                <p className="text-xs text-gray-500 ">{new Date(e.create_at).toLocaleString()}</p>
                            </div>
                            {
                                e.userid == user?._id && <Button onClick={() => {
                                    deleteComment(e.id);
                                }} variant={"destructive"} disabled={loading}><Trash2></Trash2></Button>
                            }
                        </div>
                    }) : <p>No Comment Yet</p>
                }
            </CardContent>
        </Card>
    </div>


}

export default BlogPage