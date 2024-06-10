"use server"

import { db } from "@/lib/db"



export async function getjobofferbyid(id:string)
{
    const job=await db.job.findFirst({
        where:{
            id:id
        },
    }
    )
    return job;
}