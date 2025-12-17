"use client"

import Loading from '@/src/components/loading'
import { Avatar, AvatarImage } from '@/src/components/ui/avatar'
import { Button } from '@/src/components/ui/button'
import { Card, CardHeader, CardTitle ,CardContent} from '@/src/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/src/components/ui/dialog'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { useAppData,user_service } from '@/src/context/AppContext'
import Cookies from 'js-cookie'
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { use, useState } from 'react'
import React from 'react'
import { toast } from 'react-hot-toast'
import { redirect, useRouter } from 'next/navigation'
import axios from 'axios'

const ProfilePage= () => {
     const {user,setUser,logoutUser}=useAppData()

     if(!user) return redirect('/login')

     const logoutHandler=async()=>{
         logoutUser();
      }
    const InputRef=React.useRef<HTMLInputElement>(null);

    const [loading,setLoading]=useState(false);
    const [open,setOpen]=useState(false);
    const router=useRouter();
    const [formData,setFormData]=useState({
        name:user?.name || "",
        instagram:user?.instagram || "",
        facebook:user?.facebook || "",
        linkedin:user?.linkedin || "",
        bio:user?.bio || "",
    });

    const clickHandler=()=>{
        InputRef.current?.click();
    }

    interface UpdateProfilePicResponse{
        message:string,
        token:string,
        user:any;
    }

    const changeHandler =async(e:any)=>{
        const file=e.target.files[0];

        if(file){
            const formData=new FormData();
            formData.append("file",file);

            try {
                setLoading(true);
                const token=Cookies.get("token");
                const {data}=await axios.post<UpdateProfilePicResponse>(`${user_service}/api/v1/user/update/pic`, formData,{
                    headers:{
                       Authorization:`Bearer ${token}`,
                    }
                })
                toast.success(data.message);
                setLoading(false);
                Cookies.set("token",data.token,{
                    expires:5,
                    secure:true,
                    path:"/"
                })
                
                setUser(data.user);
                

            } catch (error) {
                toast.error("Error while uploading image");
                setLoading(false);
                console.log(error);
            }
        }
    }

   interface UpdateUserResponse {
  message: string;
  token: string;
  user: any;
}

const handleFormSubmit = async () => {
  try {
    setLoading(true);

    const token = Cookies.get("token");

    const { data } = await axios.post<UpdateUserResponse>(
      `${user_service}/api/v1/user/update`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(data.message);

    Cookies.set("token", data.token, {
      expires: 5,
      secure: true,
      path: "/",
    });

    setUser(data.user);
    setOpen(false);
    setLoading(false);

  } catch (error) {
    toast.error("Update failed");
    setLoading(false);
    console.log(error);
  }
};

   

  return (
    
    <div className='flex justify-center items-center min-h-screen p-4'>
        {
            loading ? <Loading/> :  <Card className='w-full max-w-xl shadow-lg border rounded-2xl p-6'>
            <CardHeader className='text-center'>
                <CardTitle className="text-2xl font-semibold"> Profile </CardTitle>
                <CardContent className="flex flex-col items-center space-y-4">
                   <Avatar className='w-28 h-28 border-4 border-gray-200 shadow-md cursor-pointer'  onClick={clickHandler}>
                    <AvatarImage src={user?.image || "/default-avatar.png"} alt="Profile Picture" />
                    <input type="file" className="hidden" accept='image/*'  ref={InputRef} onChange={changeHandler} title='profile image' />
                   </Avatar>

                   <div className='w-full space-y-2 text-center '>
                    <label className='font-medium'>Name</label>
                    <p>{user?.name}</p>
                   </div>

                   {
                    user?.bio &&  (
                        <div className='w-full space-y-2 text-center '>
                    <label className='font-medium'>Bio</label>
                    <p>{user?.bio}</p>
                   </div>
                    )
                   }

                   <div className='flex gap-4 mt-3'>
                      {
                        user?.instagram && <a href={user.instagram} target="_blank " rel="noopener noreferrer" title="Instagram Profile"><Instagram  className='text-pink-500 text-2xl' /></a>
                      }

                        {user?.facebook && (
                  <a
                    href={user.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook Profile"
                  >
                    <Facebook className="text-blue-500 text-2xl" />
                  </a>
                )}

                  {user?.linkedin && (
                  <a
                    href={user.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="text-blue-700 text-2xl" />
                  </a>
                )}


                   </div>

                   <div className='flex flex-col sm:flex-row gap-2 mt-6 w-full justify-center'>
                    <Button onClick={logoutHandler}>Logout</Button>
                    <Button onClick={()=>router.push("/blog/new")}>Add Blog</Button>

                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                             <Button variant={"outline"}>Edit Profile</Button>
                        </DialogTrigger>

                        <DialogContent className='sm:max w-[500px]'>
                            <DialogHeader>
                                <DialogTitle>Edit Profile</DialogTitle>
                            </DialogHeader>

                            <div className='space-y-3'>
                                <div>
                                    <Label>Name</Label>
                                    <Input value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})} placeholder='Your Name' />
                                </div>

                                 <div>
                                    <Label>Bio</Label>
                                    <Input value={formData.bio} onChange={(e)=>setFormData({...formData,bio:e.target.value})} placeholder='Your Bio' />
                                </div>

                                 <div>
                                    <Label>Instagram</Label>
                                    <Input value={formData.instagram} onChange={(e)=>setFormData({...formData,instagram:e.target.value})} placeholder='Your Name' />
                                </div>

                                 <div>
                                    <Label>Facebook</Label>
                                    <Input value={formData.facebook} onChange={(e)=>setFormData({...formData,facebook:e.target.value})} placeholder='Your Facebook' />
                                </div>

                                 <div>
                                    <Label>Linkedin</Label>
                                    <Input value={formData.linkedin} onChange={(e)=>setFormData({...formData,linkedin:e.target.value})} placeholder='Your Name' />
                                </div>

                            </div>

                            <Button onClick={handleFormSubmit} className='w-full mt-4'>Save Changes</Button>
                        </DialogContent>
                    </Dialog>
                   </div>
                </CardContent>
            </CardHeader>
        </Card>
        }
    </div>
  )
}

export default ProfilePage