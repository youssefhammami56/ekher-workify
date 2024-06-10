import { use } from 'react';
"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"



export async function getMypostuledJobs() {
  
    const user=await auth()
    const userId=user!.user.id
    const jobs=await db.jobApplication.findMany({
        where:{
            userId:userId
        },
        include:{
            job:{
                include:{
                    createdBy:true
                }
            }
            
        }
    })
    return jobs
}
