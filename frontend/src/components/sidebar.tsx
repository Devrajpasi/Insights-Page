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
                    <SidebarMenu>
                        {/* 'All' Button */}
                        <SidebarMenuItem>
                            <SidebarMenuButton 
                                onClick={() => setcategory("")}
                                isActive={category === ""} 
                            >
                               
                                {category === "" ? <CheckSquare className='text-primary'/> : <BoxSelect/>}
                                <span>All</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        {/* Mapped Categories */}
                        {blogCategories?.map((e, i) => {
                            const isSelected = category === e; 
                            return (
                                <SidebarMenuItem key={i}>
                                    <SidebarMenuButton 
                                        onClick={() => setcategory(e)}
                                        isActive={isSelected}
                                    >
                                         {/* 5. Swap Icon based on state */}
                                        {isSelected ? <CheckSquare className='text-primary'/> : <BoxSelect/>}
                                        <span>{e}</span>
                                    </SidebarMenuButton>
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