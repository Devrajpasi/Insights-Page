"use client"

export const user_service="http://localhost:5000"
export const author_service="http://localhost:5001"
export const blog_service="http://localhost:5002"

import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Cookies  from 'js-cookie';
import axios from "axios";
import { Toaster } from "react-hot-toast";


export interface User{
     _id:string;
        name:string;
        email:string;
        image:string;
        instagram:string;
        facebook:string;
        linkedin:string;
        bio:string;
}

export interface Blog{
    id:string;
    title:string;
    description:string;
    blogcontent:string;
    image:string;
    category:string;
    author:string;
    createdAt:string;

}

interface AppContextType{
    user:User | null
}


const AppContext=createContext<AppContextType | undefined>(undefined)

interface AppProviderProps{
    children:ReactNode
}




export const AppProvider:React.FC<AppProviderProps>=({
    children
})=>{
    const [user,setUser]=useState<User | null>(null)
    const [isAuth,setIsAuth]=useState(false)
    const [loading,setLoading]=useState(true)

    async function fetchUser() {
  try {
    const token = Cookies.get("token");

    const { data } = await axios.get<User>(`${user_service}/api/v1/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUser(data);
    setIsAuth(true);
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
}


    useEffect(()=>{
        fetchUser()
    },[])

    return <AppContext.Provider value={{user}}>{children}<Toaster /></AppContext.Provider>
}

export const useAppData=():AppContextType=>{
    const context=useContext(AppContext)
    if(context===undefined){
        throw new Error("useAppData must be used within an AppProvider")
    }
    return context;
}