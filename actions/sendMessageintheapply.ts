"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"


export async function sendMessageinapply(applyId:string,message:string,fileurl:string ,fileName:string)
{
    const user=await auth()
    const userr=await db.user.findFirst({
        where:{
            id:user!.user.id
        }
    })
    const order=await db.jobApplication.findFirst({
        where:{
            id:applyId,
            
        },
        include:{
            job:true,
            user:true
        }
        
        
    })
    if(!order)
    {
        throw new Error("Order not found")
    }

    
    await db.message.create({
        data:{
            jobApplicationId:applyId,
            text:message,
            senderId:user!.user.id,
            recipientId:user!.user.id===order?.userId?order?.job?.userId:order?.userId!,
            fileUrl:fileurl,
            fileName:fileName

            
        }
    })
    const notification=await db.notifications.create({
        data:{
            userID:user!.user.id===order?.userId?order?.job?.userId:order?.userId!,
            message:`You have a new message from ${userr?.username} about ${order?.job?.title}`,
            isRead:false

        }
    })
}
export async function senFile(applyId:string,fileurl:string)
{
    const user=await auth()
    const userr=await db.user.findFirst({
        where:{
            id:user!.user.id
        }
    })
    const order=await db.jobApplication.findFirst({
        where:{
            id:applyId,
            
        },
        include:{
            job:true,
            user:true
        }
        
        
    })
    if(!order)
    {
        throw new Error("Order not found")
    }

    
    await db.message.create({
        data:{
            jobApplicationId:applyId,
            text:"",
           
            senderId:user!.user.id,
            recipientId:user!.user.id===order?.userId?order?.job?.userId:order?.userId!,
            fileUrl:fileurl,
            fileName:""

            
        }
    })
    const notification=await db.notifications.create({
        data:{
            userID:user!.user.id===order?.userId?order?.job?.userId:order?.userId!,
            message:`You have a new message from ${userr?.username} about ${order?.job?.title}`,
            isRead:false

        }
    })
}
/*model Notifications {
  id String @id @default(uuid())

  userID  String
  user    User   @relation(fields: [userID], references: [id])
  message String

  createdAt DateTime @default(now())
  isRead    Boolean  @default(false)
}*/