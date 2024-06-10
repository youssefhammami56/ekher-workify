"use server"
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { add } from "date-fns";
import { revalidatePath } from "next/cache";


export async function addPostInCommunity(comunityId: string, message: string , image:string | null) {

    const user=await auth()
    const userId=user?.user.id

    const post=await db.post.create({
        data:{
            content:message,
            communityId:comunityId,
            userId:userId!,
            imageUrl:image
            
            
        }
    })
    if(post){
        return revalidatePath(`/community/${comunityId}`)
    }
}
