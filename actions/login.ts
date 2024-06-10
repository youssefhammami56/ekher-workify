"use server"

import { signIn } from "@/auth"
import { LoginSchema } from "@/schemas"
import { AuthError } from "next-auth"
import { z } from "zod"
import { getUserByEmail } from "@/data/user"


export const login=async(values:z.infer<typeof LoginSchema>)=>
{
    const validateFiels=LoginSchema.safeParse(values)
    if(!validateFiels.success)
    {
        return {error:"Invalid fields"}
    }
    const {email,password}=validateFiels.data
    const existingUser=await getUserByEmail(email)
    if(!existingUser || !existingUser.email || !existingUser.password)
    {
        return {error:"EMAIL DOES NOT EXIST"}
    }
     if(!existingUser.emailVerified)
     {
        
         console.log("sent mail of verifictaion")
         return {error:"Please verify your email before logging in. A new verification email has been sent to your email address."}


     }
    try{
        if(!existingUser.isActive)
        {
            return {error:"Account is deactivated"}
        }
        const gettherole=existingUser.role
        if(gettherole==="CLIENT")
        {
            await signIn('credentials',{email,password,redirectTo:"/buyer/search"})
        }
        else if(gettherole==="FREELANCER")
        {
            await signIn('credentials',{email,password,redirectTo:"/seller/dashboard"})
        }
        else if(gettherole==="ADMIN")
        {
            await signIn('credentials',{email,password,redirectTo:"/admin/frelencers"})
        }
        
        return {success:"Logged in"}
    }catch(error:any){
        if(error instanceof AuthError)
        {
            switch(error.type)
            {
                case"CredentialsSignin":
                return {error:"Invalid credentials"}
                default:
                return {error:"An error occurred"}
            }
        }
        throw error


    }

}