"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"


export async function updateProfileData(name:string,descreption:string,fullname:string){
    try{
        const user=await auth()
        const userId=user?.user.id
        const existinguser=await db.user.findFirst({where:{id:userId}})
       await db.user.update({where:{id:userId},
        data:{
            username:name,
            description:descreption,
            fullname:fullname
            
            

        }
            
            })
        
      
    }catch(e)
    {
        return null
    }
}