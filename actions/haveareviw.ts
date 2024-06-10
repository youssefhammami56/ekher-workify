"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"



export async function havereveiw(gigid:string)
{
    const user=await auth()
    const review=await db.reviews.findFirst({
        where:{
            gigId:gigid,
            reviewerId:user?.user.id!
        }
    })
    if(review)
    {
        return true
    }
    return false
}