"use server"

import { db } from "@/lib/db"



export async function rejectApply(applyId: string) {
    const getjobname = await db.jobApplication.findUnique({
        where: {
            id: applyId
        },
        include: {
            job: true,
            
        }
    })

     await db.jobApplication.update({
        where: {
            id: applyId
        },
        data: {
            status: "rejected"
        }
    })
    const createnotification=await db.notifications.create({
        data:{
            message:"Your application for "+getjobname!.job.title+" has been rejected",
            userID:getjobname!.userId
        }
    })
}