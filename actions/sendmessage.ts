"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"


export async function sendMessage(orderId:string,message:string)
{
    const user=await auth()
    const userr=await db.user.findFirst({
        where:{
            id:user!.user.id
        }
    })

    const order=await db.orders.findFirst({
        where:{
            id:orderId,
            
        },
        include:{
            seller:true,
            buyer:true,
            gig:true
            
            
            
        }
        
        
    })
    if(!order)
    {
        throw new Error("Order not found")
    }

    
    await db.message.create({
        data:{
            orderId:orderId,
            text:message,
            senderId:user!.user.id,
            recipientId:user!.user.id===order?.buyerId?order?.sellerId:order?.buyerId!
            
        }
    })
    const notification=await db.notifications.create({
        data:{
            userID:user!.user.id===order?.buyerId?order?.sellerId:order?.buyerId!,
            message:`You have a new message from ${userr?.username} about ${order?.gig.title}`,
            distinationId:orderId,
            
            isRead:false

        }
    })
    
}