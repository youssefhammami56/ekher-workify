"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function getSellerOrders()
{
    const user=await auth()
    const userId=user?.user.id
    const orders=await db.orders.findMany({
        where:{
            sellerId:userId
        },
        include:{
            gig:true,
            buyer:true
        }
    }
    )
    return orders
}