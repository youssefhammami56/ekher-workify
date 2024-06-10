"use server"

import { signOut } from "@/auth";

export  const  logout=async()=>{
    console.log("logout")
     await signOut()
     //try to redirect to login page
    //  return {redirect: { destination: '/login', permanent: false }}

    
}