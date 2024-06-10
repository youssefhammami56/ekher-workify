"use server"

import { db } from "@/lib/db"



export async function getMessageInOrder(orderId:string)
{
    const messages=await db.message.findMany({
        where:{
            orderId:orderId
        },
        include:{
            sender:true,
            recipient:true
            
        }
    })
    return messages
}