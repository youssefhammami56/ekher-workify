"use server"

import { auth } from "@/auth";
import { db } from "@/lib/db";


export async function existingOrder(gigId:string){
    const user=await auth();
    const gig=await db.gigs.findUnique({
        where:{
            id:gigId
        }
    })
    if(!gig){
        throw new Error("Gig not found")
    }
    const order=await db.orders.findFirst({
        where:{
            buyerId:user?.user.id!,
            gigId:gigId
        }
    })
    if(!order){
        return false
    }
    return true
}