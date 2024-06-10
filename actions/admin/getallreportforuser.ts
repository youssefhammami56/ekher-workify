"use server"

import { db } from "@/lib/db"



export async function getallreports(id:string)
{
    const reports=await db.report.findMany({
        where:{
            reportedUserId:id
        },
        include:{
            user:true
        }
        }
    )
    return reports
}