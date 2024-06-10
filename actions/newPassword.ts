"use server"
import { getPasswordResetTokenByToken } from '@/data/password-reset-token';
import { NewPasswordSchema } from './../schemas/index';
import { z } from "zod";
import { getUserByEmail } from '@/data/user';

import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export const newPassword=async(values:z.infer<typeof NewPasswordSchema>,token:string)=>{
    

    if(!token){
        return {error:"Invalid token"}
    }
    console.log("token",token)

    const validateFileds=NewPasswordSchema.safeParse(values)
    if(!validateFileds.success){
        return {error:validateFileds.error.errors[0].message}
    }
    const {password}=values

    const existingToken=await getPasswordResetTokenByToken(token)
    if(!existingToken){
        return {error:"Invalid token"}
    }
    const hasExpired=new Date (existingToken.expires)<new Date()
    if(hasExpired){
        return {error:"Token has expired"}
    }

    const existingUser=await getUserByEmail(existingToken.email)
    if(!existingUser){
        return {error:"User not found"}
    }
    const hashedPassword=await bcrypt.hash(password,10)
    await db.user.update
    ({
        where:{
            id:existingUser.id
        },
        data:{
            password:hashedPassword

        }
    })
    await db.passwordResetToken.delete({
        where:{
            id:existingToken.id
        }
    })
    return {succes:"Password has been reset"}



   
}