"use server"

import { db } from "@/lib/db"




export async function handelcancelorder(applyId:string)
{
    await db.orders.delete({
        where:{
            id:applyId
        }
    })
}