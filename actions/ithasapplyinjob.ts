"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"



export async function ithasapplyinjob(jobId:string){
    const user=await auth()
    const userId=user?.user.id
    console.log(userId,jobId)
    try{
   const existingapply=await db.jobApplication.findFirst({
            where:{
                jobId:jobId!,
                userId:userId!
            }
    })
    if(existingapply){
        return true
    }
    return false
   
}catch(e){
    console.log(e)
}
}