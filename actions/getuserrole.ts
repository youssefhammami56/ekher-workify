"use server"

import { db } from "@/lib/db"



export async function getuserrole(id:string)
{
    const user=await db.user.findFirst({where:{id},select:{role:true}})
    if(user)
    {
        return {role:user.role}
    }
    return {error:"User not found"}
}