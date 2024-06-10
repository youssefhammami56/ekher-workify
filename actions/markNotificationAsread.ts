"use server"

import { db } from "@/lib/db"


export async function markNotificationAsRead(notificationId:string){
    
    const notification = await db.notifications.update({
        where: {
        id: notificationId
        },
        data: {
        isRead: true
        }
    })
    return notification
}