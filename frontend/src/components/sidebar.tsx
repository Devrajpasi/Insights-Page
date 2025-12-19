"use client"

import React from 'react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { Input } from './ui/input'
import { BoxSelect } from 'lucide-react'
import { blogCategories } from '@/app/blog/new/page'
import { useAppData } from '@/context/AppContext'

const SideBar = () => {
    const {searchQuery,setsearchQuery,setcategory}=useAppData()
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
                    <Input type="text" placeholder="Search you desired blog" onChange={(e)=>setsearchQuery(e.target.value)}></Input>
                    <SidebarGroupLabel>Categories</SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton onClick={()=>setcategory("")}>
                                <BoxSelect/>
                                    <span>All</span>
                                
                            </SidebarMenuButton>
                            {
                                blogCategories?.map((e, i) => {
                                    return (<SidebarMenuButton key={i} onClick={()=>setcategory(e)}>
                                        <BoxSelect/>
                                            <span>{e}</span>
                                    </SidebarMenuButton>)
                                })
                            }

                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

            </SidebarContent>
        </Sidebar>
    )
}

export default SideBar