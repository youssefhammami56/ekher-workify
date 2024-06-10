"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function getLoggedUser(){
    
        const useri=await auth()
        const userId=useri?.user.id
       
        const user=await db.user.findUnique({
            where:{
                id:userId
            },
            include:{
                origin:true
            }
            
            

        }
        
    )
    console.log("user"+JSON.stringify(user))
        

        return user
    
}