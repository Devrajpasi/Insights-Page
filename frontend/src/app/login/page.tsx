import React from 'react'
import { Button } from "../../components/ui/button"
import {
  Card,
 
  CardContent,
  CardDescription,
  
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import Cookies from 'js-cookie'
import { user_service } from '@/src/context/AppContext'
import { toast } from 'react-hot-toast/headless'


const LoginPage = () => {

  interface LoginResponse{
    token:string,
    message:string
  }

  const responseGoogle=async(authResult:any)=>{
      try {
        const result=await axios.post<LoginResponse>(`${user_service}/api/v1/login`,{
          code:authResult["code"],
        })
      
        Cookies.set("token",result.data.token,{
          expires:5,
          secure:true,
          path:"/"
        })
        
        toast.success(result.data.message)
        
        
      } catch (error) {
         console.log("error",error);
         toast.error("Problem while logging you")
      }
  }

  return (
    <div className="w-[350px] m-auto mt-[200px]">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Login to The Reading Retreat</CardTitle>
              <CardDescription>Your go to blog app</CardDescription>
            </CardHeader>
            <CardContent>
              <Button >
                Login with google{" "}
                <img
                  src={"/google1.png"}
                  className="w-6 h-6 rounded-2xl"
                  alt="google icon"
                />
              </Button>
            </CardContent>
          </Card>
        </div>
  )
}

export default LoginPage