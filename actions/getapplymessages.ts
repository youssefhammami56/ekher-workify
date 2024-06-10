"use server"
import { db } from "@/lib/db"
export async function getapplymessages(applyId:string) {
  
    const messages=await db.message.findMany({
        where:{
            jobApplicationId:applyId
        },
       
    })
    return messages
}