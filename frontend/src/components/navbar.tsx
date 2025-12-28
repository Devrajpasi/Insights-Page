"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { 
  CircleUserRound, 
  LogIn, 
  Menu, 
  X, 
  Sparkles, 
  Bookmark 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppData } from "@/context/AppContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  
  const { loading, isAuth, user } = useAppData();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo Section */}
        <Link href={"/blogs"} className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white transition-transform group-hover:scale-105">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            The Insight Page
          </span>
        </Link>
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

       
        <div className="hidden md:flex items-center gap-6">
          <Link href={"/blogs"}>
             <Button variant="ghost" className="text-gray-600 hover:text-black">
                Home
             </Button>
          </Link>

          {isAuth && (
             <Link href={"/blog/saved"}>
                <Button variant="ghost" className="text-gray-600 hover:text-black gap-2">
                    <Bookmark className="h-4 w-4" />
                    Saved
                </Button>
             </Link>
          )}

          <div className="h-6 w-px bg-gray-200 mx-2"></div>

          {loading ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
          ) : (
            <>
              {isAuth ? (
                <Link href={"/profile"}>
                 
                  {user?.image ? (
                    <img 
                        src={user.image} 
                        alt="Profile" 
                        className="h-8 w-8 rounded-full object-cover border border-gray-200" 
                    />
                  ) : (
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <CircleUserRound className="h-6 w-6 text-gray-700" />
                    </Button>
                  )}
                </Link>
              ) : (
                <Link href={"/login"}>
                  <Button className="gap-2 rounded-full px-6">
                    <LogIn className="h-4 w-4" />
                    Login
                  </Button>
                </Link>
              )}
            </>
          )}
        </div>
      </div>

   
      <div
        className={cn(
          "md:hidden overflow-hidden border-b bg-white transition-all duration-300 ease-in-out",
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col space-y-4 p-6">
          <Link 
            href={"/"} 
            className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          
          {isAuth && (
            <Link 
                href={"/blog/saved"} 
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors"
                onClick={() => setIsOpen(false)}
            >
              <Bookmark className="h-4 w-4" />
              Saved Blogs
            </Link>
          )}

          <div className="border-t border-gray-100 pt-4">
             {loading ? (
                <div className="h-8 w-20 animate-pulse rounded bg-gray-200" />
             ) : isAuth ? (
                <Link 
                    href={"/profile"} 
                    className="flex items-center gap-2 text-sm font-medium text-gray-900"
                    onClick={() => setIsOpen(false)}
                >
                 
                  {user?.image ? (
                    <img 
                        src={user.image} 
                        alt="Profile" 
                        className="h-6 w-6 rounded-full object-cover" 
                    />
                  ) : (
                    <CircleUserRound className="h-5 w-5" />
                  )}
                  My Profile
                </Link>
             ) : (
                <Link href={"/login"} onClick={() => setIsOpen(false)}>
                  <Button className="w-full gap-2">
                    <LogIn className="h-4 w-4" />
                    Log In
                  </Button>
                </Link>
             )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;