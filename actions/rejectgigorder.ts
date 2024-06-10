"use server"

import { db } from "@/lib/db"


export async function rejectGigOrder(id:string) {
    const getthegigname=await db.orders.findUnique({
        where:{
            id
        },
        include:{
            gig:true,
            buyer:true
            
        }
    })
    const order = await db.orders.delete({
        where:{
            id
        }
        
       
    })
    const notif=await db.notifications.create({
        data:{
            message:"Your order for "+getthegigname!.gig.title+" has been rejected",
            userID:getthegigname!.buyer.id
        }
    })
    return order
}


export async function markorderascompletd(id:string)
{
    await db.orders.update({
        where:{
            id
        },
        data:{
            isCompleted:true,
            completedAt:new Date(),
            status:"COMPLETED"
        }
    })
}


export async function calcaluterevenuebythestartdateandenddateoforderbyId(id:string)
{
    const order=await db.orders.findUnique({
        where:{
            id
        }
    })
    const startdate=order!.startedAt
    const enddate=order!.completedAt
    const defiernceonday=(enddate!.getDay()-startdate!.getDay())
    const revenue=defiernceonday*order!.price

    
    return revenue
}