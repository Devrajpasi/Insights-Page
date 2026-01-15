"use client";

import Loading from "@/components/loading";
import {
  Blog,
  blog_service,
  useAppData,
  User,
} from "@/context/AppContext";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import {
  BookmarkCheck,
  BookMarked,
  Edit,
  Trash2,
  Trash2Icon,
  User2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Cookies from "js-cookie";
import toast from "react-hot-toast";



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

interface SingleBlogResponse {
  blog: Blog;
  author: User;
}



const BlogSkeleton = () => (
  <div className="max-w-4xl mx-auto p-6 space-y-6 animate-pulse">
    <div className="h-8 w-3/4 bg-gray-200 rounded" />
    <div className="h-4 w-1/3 bg-gray-200 rounded" />
    <div className="h-64 bg-gray-200 rounded-lg" />
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
    </div>
  </div>
);



const BlogPage = () => {
  const { isAuth, user, savedBlogs } = useAppData();
  const router = useRouter();
  const { id } = useParams();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageError, setPageError] = useState(false);
  const [saved, setSaved] = useState(false);

  

  async function fetchSingleBlog() {
    if (!id) return;
    try {
      const { data } = await axios.get<SingleBlogResponse>(
        `${blog_service}/api/v1/blog/${id}`
      );
      setBlog(data.blog);
      setAuthor(data.author);
    } catch (error) {
      console.log(error);
      setPageError(true);
    }
  }

  async function fetchComment() {
    if (!id) return;
    try {
      const { data } = await axios.get<CommentResponse>(
        `${blog_service}/api/v1/comment/${id}`
      );
      setComments(data.comments);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchSingleBlog();
    fetchComment();
  }, [id]);

  useEffect(() => {
    if (savedBlogs && savedBlogs.some((b) => b.blogid === id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [savedBlogs, id]);



  async function addComment() {
    try {
      setLoading(true);
      const token = Cookies.get("token");
      const { data } = await axios.post<{ message: string }>(
        `${blog_service}/api/v1/comment/${id}`,
        { comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(data.message);
      setComment("");
      fetchComment();
    } catch (error) {
      toast.error("Failed to add comment");
    } finally {
      setLoading(false);
    }
  }

  

  if (pageError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold">Blog not found</h2>
        <Button className="mt-4" onClick={() => router.push("/blogs")}>
          Go Back
        </Button>
      </div>
    );
  }

  

  return (
    <>
      {!blog && <BlogSkeleton />}

      {blog && (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          <Card>
            <CardHeader>
              <h1 className="text-3xl font-bold">{blog.title}</h1>

              <p className="flex items-center gap-2 text-gray-600 mt-2">
                <Link
                  href={`/profile/${author?._id}`}
                  className="flex items-center gap-2"
                >
                  <img
                    src={author?.image}
                    className="w-8 h-8 rounded-full"
                    alt=""
                  />
                  {author?.name}
                </Link>

                {isAuth && (
                  <Button variant="ghost" size="sm">
                    {saved ? <BookmarkCheck /> : <BookMarked />}
                  </Button>
                )}

                {blog.author === user?._id && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => router.push(`/blog/edit/${id}`)}
                    >
                      <Edit />
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2Icon />
                    </Button>
                  </>
                )}
              </p>
            </CardHeader>

            <CardContent>
              <img
                src={blog.image}
                loading="lazy"
                className="w-full h-64 object-cover rounded-lg mb-4 bg-gray-200"
                alt=""
              />

              <p className="text-lg text-gray-700 mb-4">
                {blog.description}
              </p>

              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.blogcontent }}
              />
            </CardContent>
          </Card>

          {isAuth && (
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Leave a Comment</h3>
              </CardHeader>
              <CardContent>
                <Label>Your Comment</Label>
                <Input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="my-2"
                />
                <Button onClick={addComment} disabled={loading}>
                  {loading ? "Posting..." : "Post Comment"}
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">All Comments</h3>
            </CardHeader>
            <CardContent>
              {comments.length > 0 ? (
                comments.map((c) => (
                  <div key={c.id} className="border-b py-2">
                    <p className="font-semibold flex items-center gap-2">
                      <User2 size={16} /> {c.username}
                    </p>
                    <p>{c.comment}</p>
                  </div>
                ))
              ) : (
                <p>No comments yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default BlogPage;
