"use server"


import { RegisterSchema } from "@/schemas"
import { z } from "zod"
import { db } from "@/lib/db"


import bcrypt from "bcryptjs"

export const register=async(values:z.infer<typeof RegisterSchema>)=>
{
    
    const validateFiels=RegisterSchema.safeParse(values)
    if(!validateFiels.success)
    {
        return {error:"Invalid fields"}
    }
    const {email,password,name,role,imageUrl}=validateFiels.data
    const hassedPassword=await bcrypt.hash(password,10)
    const existUser=await db.user.findFirst({where:{email}})
    if(existUser)
    {
        return {error:"Email already exist"}
    }
    
    await db.user.create({data:{email,password:hassedPassword,username:name,role:role!=="CLIENT"?"FREELANCER":"CLIENT",profileImage:imageUrl}})
   


    return {succes:"Account created "}

}