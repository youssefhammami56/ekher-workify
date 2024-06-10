"use server"

import { db } from "@/lib/db"



export async function getalljoboffersdispo() {
  
    const jobs=await db.job.findMany({
        where:{
            isCompleted:false
            
        },
        include:{
            
           createdBy :{
                select:{
                    id:true,
                     profileImage:true,
                     email:true,
                     username:true,
                     Job:{
                        select:{
                            id:true
                        }
                     }
                }
                
           }
        }

    })
   
    
    return jobs
}