"use client"
import React from "react";
import { Button } from "../components/ui/button";
import { useAppData } from "../context/AppContext";
import Loading from "../components/loading";
import HomeLayout from "@/components/homelayout";
import { useSidebar } from "@/components/ui/sidebar";
import { Filter } from "lucide-react";

const Home=()=>{
  const {toggleSidebar}=useSidebar()
  const {loading,blogLoading,blogs} =useAppData()

  return (
    <HomeLayout>{
      loading ? <Loading/>:<div className="container mx-auto px-4">
        <div className="flex justify-between items-center my-5">
          <h1 className="text-3xl font-bold">
            Latest Blogs
          </h1>
          <Button onClick={toggleSidebar} className="flex items-center gap-2 px-4 bg-primary text-white">
            <Filter size={18}><span>Filter Blogs</span></Filter>
          </Button>
        </div>
      </div>
    
    }
    </HomeLayout>
  )
}

export default Home;