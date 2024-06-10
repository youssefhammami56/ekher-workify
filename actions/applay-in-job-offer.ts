"use server"
import { auth } from "@/auth"
import { db } from "@/lib/db"


export async function applyinjoboffer(jobId:string){
    const user=await auth()
    const userId=user?.user.id
    const job=await db.job.findFirst({
        where:{
            id:jobId
        },
        include:{
            createdBy:true
        }
    })
    if(!job){
        throw new Error("Job not found")
    }
    try{
   const jobapply=await db.jobApplication.create({
         data:{
              jobId:jobId!,
              userId:userId!
         }
   })
   const notification=await db.notifications.create({
         data:{
              message:"You have a new application for "+job.title,
              userID:job.createdBy.id,
              distinationId:jobId,
         }
    })
}catch(e){
    console.log(e)
}
}