"use server"
import { db } from '@/lib/db';



export async function acceptApply(applyId: string) {

    const getjobname = await db.jobApplication.findUnique({
        where: {
            id: applyId
        },
        include: {
            job: {
                include: {
                    createdBy: true
                }
            },
            user:true
        }
    })

     await db.jobApplication.update({
        where: {
            id: applyId
        },
        data: {
            status: "accepted"
            
        }
    })
    await db.job.update({
        where:{
            id:getjobname!.jobId
        },
        data:{
            isCompleted:true
        }
    
    })
    const createnotification=await db.notifications.create({
        data:{
            message:"Your application for "+getjobname!.job.title+" has been accepted",
            userID:getjobname!.userId
        }
    })
    const contract=await db.contarct.create({
        data:{
            jobApplicationId:applyId,
            freelancerId:getjobname!.userId,
            clientId:getjobname!.job.userId,
            title:"Contract for "+getjobname!.job.title,
            description:"Contract for "+getjobname!.job.title +" between "+getjobname!.job.createdBy.username+" and "+getjobname!.user.username,
            price:getjobname!.job.price
            

        }
    })
}

