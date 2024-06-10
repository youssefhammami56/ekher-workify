"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"



export async function getAllNotifications() {
    const user=await auth()
    const notif=await db.notifications.findMany({
        where:{
            userID:user?.user.id!
        },include:{
            user:true
        },
        orderBy:{
            createdAt:"desc"
        }
    })
    return notif
}