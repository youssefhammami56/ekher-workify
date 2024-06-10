"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"


export async function getLoggedUser(){
    const user=await auth()
    return await db.user.findUnique({   
        where:{
            id:user?.user.id
        },
        include:{
            origin:true
        }
        
    }

)
}