"use client"

import { Button } from '@/src/components/ui/button'
import { Card, CardContent, CardHeader } from '@/src/components/ui/card'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select'
import { RefreshCw } from 'lucide-react'
import React from 'react'

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
    const handleSubmit = () => { }
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
                            <Input name="title" required />
                            <Button type="button" >
                                <RefreshCw></RefreshCw>
                            </Button>
                        </div>

                        <Label>Description</Label>
                        <div className='flex justify-center items-center gap-2'>
                            <Input name="description" required />
                            <Button type="button" >
                                <RefreshCw></RefreshCw>
                            </Button>
                        </div>

                        <Label>Category</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
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
                            <Input type="file" accept="image/*"></Input>
                        </div>


                        <div>
                            <Label>Blog Content</Label>
                            <div className='flex justify-between items-center'>
                                <p className='text-sm text-muted-foreground'>
                                    Paste your blog or type here.. You can use rich text formatting . Please add image after improving you grammer
                                </p>
                                <Button type="button"  size={"sm"}>
                                    <RefreshCw size={16}>
                                        <span className='ml-2'>Improve Grammar</span>
                                    </RefreshCw>
                                </Button>
                            </div>

                        </div>


                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default AddBlog