"use client";

import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/card";
import Cookies from "js-cookie";
import { useAppData, user_service } from "@/src/context/AppContext";
import { toast } from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { redirect } from "next/dist/client/components/navigation";
import Loading from "@/src/components/loading";

interface LoginResponse {
  token: string;
  message: string;
  user: {
    _id: string;
    name: string;
    email: string;
    image: string;
    instagram: string;
    facebook: string;
    linkedin: string;
    bio: string;
  };
}

const LoginPage = () => {
  const {isAuth,user,loading,setIsAuth,setLoading,setUser}=useAppData();

    if(isAuth){
       return redirect("")
    }

  const responseGoogle = async (authResult: any) => {
    setLoading(true);
    try {
      console.log("GOOGLE AUTH RESULT:", authResult);

      const result = await axios.post<LoginResponse>(
        `${user_service}/api/v1/login`,
        {
          code: authResult.code,
        }
      );

      Cookies.set("token", result.data.token, {
        expires: 5,
        secure: true,
        path: "/",
      });

      toast.success(result.data.message);
      setIsAuth(true);
      setLoading(false);
      setUser(result.data.user);

    } catch (error: any) {
      console.log("LOGIN API ERROR:", error.response?.data || error);
      toast.error("Problem while logging you in");
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: responseGoogle,
    onError: (err) => {
      console.log("GOOGLE LOGIN ERROR:", err);
      toast.error("Google login failed");
    },
  });

  return (
    <>
    { 
    loading ? <Loading/> :
      <div className="w-[350px] m-auto mt-[200px]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login to The Reading Retreat</CardTitle>
          <CardDescription>Your go to blog app</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={googleLogin}>
            Login with google{" "}
            <img src="/google1.png" className="w-6 h-6 rounded-2xl" alt="google icon" />
          </Button>
        </CardContent>
      </Card>
    </div>
    }
    </>
  );
};

export default LoginPage;
