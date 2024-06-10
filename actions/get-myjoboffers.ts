"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"




export async function getMyjobOffers(){
    const user=await auth()
    const userId=user?.user.id
    const jobs=await db.job.findMany({
        where:{
            userId:userId,
            isCompleted:false
        },include:{
            

        }
    })
    return jobs
}