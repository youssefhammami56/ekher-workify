"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"


export async function getOrders()
{
    const user=await auth()

    const orders=await db.orders.findMany({
        where:{
            sellerId:user!.user.id
        },
        include:{
            gig:true
        }
    })
    return orders
}