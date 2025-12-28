"use client"

import React from 'react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { Input } from './ui/input'

import { BoxSelect, CheckSquare } from 'lucide-react'
import { blogCategories } from '@/context/AppContext'
import { useAppData } from '@/context/AppContext'

const SideBar = () => {

    const { searchQuery, setsearchQuery, category, setcategory } = useAppData()

    return (
        <Sidebar>
            <SidebarHeader className='bg-white text-2xl font-bold mt-5'>
                The Insight Page
            </SidebarHeader>
            <SidebarContent className='bg-white'>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Search
                    </SidebarGroupLabel>
                    <Input
                        type="text"
                        placeholder="Search you desired blog"
                        onChange={(e) => setsearchQuery(e.target.value)}
                        value={searchQuery}
                    />

                    <SidebarGroupLabel>Categories</SidebarGroupLabel>
                    <SidebarMenu className="flex flex-col gap-2 p-2">

                        <SidebarMenuItem>
                            <div
                                onClick={() => setcategory("")}
                                className={`
                cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${category === ""
                                        ? "bg-black text-white shadow-md"  // Active state for 'All'
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }
            `}
                            >
                                All
                            </div>
                        </SidebarMenuItem>


                        {blogCategories?.map((e, i) => {
                            const isSelected = category === e;
                            return (
                                <SidebarMenuItem key={i}>
                                    <div
                                        onClick={() => setcategory(e)}
                                        className={`
                        cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-colors
                        ${isSelected
                                                ? "bg-black text-white shadow-md"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }
                    `}
                                    >
                                        {e}
                                    </div>
                                </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default SideBar