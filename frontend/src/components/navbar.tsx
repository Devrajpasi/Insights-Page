"use client";

import Link from "next/link";
import { CircleUserRoundIcon, LogIn, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useAppData } from "../context/AppContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {loading,isAuth}=useAppData();


  return (
    <nav className="bg-white shadow-md p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/blogs" className="text-xl font-bold text-gray-800">
          The Reading Retreat
        </Link>

        <div className="md:hidden">
          <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        <ul className="hidden md:flex justify-center items-center space-x-6 text-gray-700">
          <li>
            <Link href="/blogs" className="hover:text-blue-500">
              Home
            </Link>
          </li>

          <li>
            <Link href="/blog/saved" className="hover:text-blue-500">
              Saved blogs
            </Link>
          </li>

          { loading ? " " :

          <li>
           {
            isAuth ? ( <Link href="/profile" className="hover:text-blue-500">
              <CircleUserRoundIcon/>
            </Link>):
             (
               <Link href="/login" className="hover:text-blue-500">
              <LogIn />
            </Link>
            )
           }
          </li>
          }
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
