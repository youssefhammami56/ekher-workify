"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"


export async function Jobswhereihaveapplied() {

    const user=await auth()
    const userId=user?.user.id
    const jobs=await db.jobApplication.findMany({
        where:{
            job:{
                userId:userId
            }
        }
    })
    return jobs

    
}