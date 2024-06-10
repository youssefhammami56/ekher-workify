"use server"

import { db } from "@/lib/db"




export async function handeldeleteapply(applyId:string)
{
    await db.jobApplication.delete({
        where:{
            id:applyId
        }
    })
}