"use server"

import { db } from "@/lib/db"



export async function togglestatus(id:string)
{
    const user=await db.user.findUnique({
        where:{
            id
        }
    })
    if(!user) throw new Error("User not found")
    const updatedUser=await db.user.update({
        where:{
            id
        },
        data:{
            isActive:!user.isActive
        }
    })
    return updatedUser
}
