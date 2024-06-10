"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"


export async function getunrededMessage()
{
    const user=await auth()
    const userId=user?.user.id

    const message=await db.message.findMany({
        where:{recipientId:userId,isRead:false},
        include:{
            order:{
                include:{
                    gig:true
                }
            },
            sender:true

        }
          
        

        
    })
    return message
}