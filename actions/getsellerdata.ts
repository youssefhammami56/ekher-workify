"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"


export async function getSellerData()
{
    
        const user=await auth()
        const userId=user?.user.id
        const gigs=await db.gigs.count({where:{userId:userId}})
        const orders=await db.orders.count({where:{sellerId:userId}})
        const message=await db.message.count(
            {where:{recipientId:userId,isRead:false}}
            
        )
        console.log("gigs",gigs)
        return {gigs,orders,message}

    
  
    
}