"use client"

import { Button } from '@/src/components/ui/button'
import { Card, CardContent, CardHeader } from '@/src/components/ui/card'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select'
import { RefreshCw } from 'lucide-react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast'
import { author_service } from '@/src/context/AppContext'
import axios from 'axios';


const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const blogCategories = [
    "Technology",
    "Health",
    "Finance",
    "Travel",
    "Education",
    "Entertainment",
    "Study"
]

const AddBlog = () => {





    const editor = useRef(null);
    const [content, setContent] = useState('');

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        image: null,
        blogcontent: "",
    });

    const handleInputChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });
    }

    interface AddBlogResponse {
        message: string;
        blog: any;
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setLoading(true);

        const fromDataToSend = new FormData();

        fromDataToSend.append("title", formData.title);
        fromDataToSend.append("description", formData.description);
        fromDataToSend.append("blogcontent", formData.blogcontent);
        fromDataToSend.append("category", formData.category);

        if (formData.image) {
            fromDataToSend.append("file", formData.image);
        }

        try {
            const token = Cookies.get("token");
            const { data } = await axios.post<AddBlogResponse>(
                `${author_service}/api/v1/blog/new`,
                fromDataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success(data.message);
            setFormData({
                title: "",
                description: "",
                category: "",
                image: null,
                blogcontent: "",
            });

            setContent("");

        } catch (error) {
            toast.error("Error while adding blog");
            console.log(error);
        } finally {
            setLoading(false);
        }

    };

    const [aiTitle, setAiTitle] = useState(false);
    

    const aiTitleResponse = async () => {
        try {
            setAiTitle(true);

            const { data } = await axios.post<string>(
                `${author_service}/api/v1/ai/title`,
                {
                    text: formData.title,
                }
            );

            setFormData({ ...formData, title: data });

        } catch (error) {
            toast.error("Problem while fetching from AI");
            console.log(error);
        } finally {
            setAiTitle(false);
        }
    };



    const config = useMemo(() => ({
        readonly: false, // all options from https://xdsoft.net/jodit/docs/,
        placeholder: 'Start typings...'
    }),
        []
    );

    return (
        <div className='max-w-4xl mx-auto p-6'>
            <Card>
                <CardHeader>
                    <h1 className='text-2xl font-bold'>Add New Blog</h1>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className='space-y-4 '>
                        <Label>Title</Label>
                        <div className='flex justify-center items-center gap-2'>
                            <Input name="title" value={formData.title} onChange={handleInputChange} placeholder='Enter blog Title' className={
                                aiTitle ? "animate-pulse placeholder:opacity-60" : ""
                            } required />
                            {formData.title === "" ? (
                                ""
                            ) : (
                                <Button
                                    type="button"
                                    onClick={aiTitleResponse}
                                    disabled={aiTitle}
                                >
                                    <RefreshCw className={aiTitle ? "animate-spin" : ""} />
                                </Button>
                            )}
                        </div>

                        <Label>Description</Label>
                        <div className='flex justify-center items-center gap-2'>
                            <Input name="description" value={formData.description} onChange={handleInputChange} placeholder='Enter blog Description' required />
                            <Button type="button" >
                                <RefreshCw></RefreshCw>
                            </Button>
                        </div>

                        <Label>Category</Label>
                        <Select onValueChange={(value: any) => setFormData({ ...formData, category: value })}>
                            <SelectTrigger>
                                <SelectValue placeholder={formData.category || "Select a category"} />
                            </SelectTrigger>
                            <SelectContent>
                                {blogCategories?.map((e, i) => (
                                    <SelectItem key={i} value={e}>
                                        {e}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <div>
                            <Label>
                                Image Upload
                            </Label>
                            <Input type="file" accept="image/*" onChange={handleFileChange}></Input>
                        </div>


                        <div>
                            <Label>Blog Content</Label>
                            <div className='flex justify-between items-center'>
                                <p className='text-sm text-muted-foreground'>
                                    Paste your blog or type here.. You can use rich text formatting . Please add image after improving you grammer
                                </p>
                                <Button type="button" size={"sm"}>
                                    <RefreshCw size={16}>
                                        <span className='ml-2'>Improve Grammar</span>
                                    </RefreshCw>
                                </Button>
                            </div>

                            <JoditEditor ref={editor} value={content} config={config} tabIndex={1} onBlur={(newContent) => {
                                setContent(newContent)
                                setFormData({ ...formData, blogcontent: newContent });
                            }} />
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>{loading ? "Submitting..." : "Submit"}</Button>

                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default AddBlog;