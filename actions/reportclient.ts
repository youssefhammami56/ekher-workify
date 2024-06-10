"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"



export async function reportclient(id:string,report:string)
{
    const user=await auth()
    const userId=user?.user.id
    await db.report.create({
        data:{
            reason:report,
            
            reportedUserId:id,
            userId:userId!
        }
    })

    await db.notifications.create({
        data:{
          userID:id,
            message:`You have been reported by ${user?.user.email}`,
            distinationId:""
        }
    })

}