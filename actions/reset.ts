"use server"

import { sendPasswordResetEmail } from '@/lib/mail';


import { db } from "@/lib/db"
import { generatePasswordResetToken } from '@/lib/tokens';
import { ResetSchema } from "@/schemas"
import { z } from "zod"
import { auth } from '@/auth';


export const Reset=async(values:z.infer<typeof ResetSchema>)=>{
   const validatedFields=ResetSchema.safeParse(values)
    if(!validatedFields.success){
         return {error:validatedFields.error.errors[0].message}
    }

    const {email}=validatedFields.data

    const existingUser=await db.user.findUnique({
        where:{
            email
        }
    })
    if(!existingUser){
        return {error:"No user with this email"}
    }

    const PasswordResetToken=await generatePasswordResetToken(email)
    await sendPasswordResetEmail(PasswordResetToken.email,PasswordResetToken.token)

    return {succes:"Email sent"}

}

export const resetPassword=async()=>{

    try{
        const user=await auth()
        const email=user?.user.email
         const PasswordResetToken=await generatePasswordResetToken(email!)
         await sendPasswordResetEmail(PasswordResetToken.email,PasswordResetToken.token)
        return {succes:"Email sent"}

    }catch(error){
        return {error:"No user"}
    }
        
    }