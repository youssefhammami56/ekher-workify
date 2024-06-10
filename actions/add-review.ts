"use server"

import { auth } from "@/auth";
import { db } from "@/lib/db";



export async function addReview(comm:string,gigId:string,rating:number){
    const user=await auth();
    await db.reviews.create({
        data:{
            reviewText:comm,
            rating:rating,
            gigId:gigId,
            reviewerId:user?.user.id!
        }

    })
}