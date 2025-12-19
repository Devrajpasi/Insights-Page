import React, {ReactNode} from 'react'

import SideBar from './sidebar'

interface BlogsProps{
    children:ReactNode 

}

const HomeLayout: React.FC<BlogsProps>= ({children}) => {
  return (
    <div>
        
            <SideBar/>
            <main className='w-full'>
                <div className='w-full min-h-[calc(100vh-45)] px-4'>{children}</div>
            </main>
    
    </div>
  )
}

export default HomeLayout