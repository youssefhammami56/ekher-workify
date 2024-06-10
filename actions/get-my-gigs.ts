"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function getMygigs()
{
    const user=await auth()
    const userid=user?.user.id
    const gigs=await db.gigs.findMany({
        where:{
            userId:userid
            

        }
    })
    return gigs
}